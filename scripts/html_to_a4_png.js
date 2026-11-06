import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer-core';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Detect available Chrome or Edge on Windows / Linux / macOS
function getExecutablePath() {
  const customPath = process.env.CHROME_BIN || process.env.PUPPETEER_EXECUTABLE_PATH;
  if (customPath && fs.existsSync(customPath)) {
    return customPath;
  }

  const standardWindowsPaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
    `${process.env.PROGRAMFILES}\\Google\\Chrome\\Application\\chrome.exe`
  ];

  for (const exePath of standardWindowsPaths) {
    if (exePath && fs.existsSync(exePath)) {
      return exePath;
    }
  }

  throw new Error('Chrome or Microsoft Edge executable not found. Set CHROME_BIN or PUPPETEER_EXECUTABLE_PATH.');
}

/**
 * A4 dimensions at 300 DPI:
 * 210mm x 297mm -> 2480px x 3508px (Portrait)
 * 297mm x 210mm -> 3508px x 2480px (Landscape)
 * Standard CSS logical viewport: 794px x 1123px (Portrait) with deviceScaleFactor 3.1234257
 */
export async function renderHtmlToA4Png(options) {
  const {
    inputPath,
    outputPath,
    orientation = 'portrait',
    omitBackground = false,
    waitSelector = null,
    waitTimeout = 1500,
    selector = null // If rendering a specific element or full page
  } = options;

  if (!inputPath || !fs.existsSync(inputPath)) {
    throw new Error(`Input HTML file not found: ${inputPath}`);
  }

  const resolvedInput = path.resolve(inputPath);
  const resolvedOutput = path.resolve(outputPath || resolvedInput.replace(/\.html$/i, '.png'));

  // Ensure output directory exists
  const outDir = path.dirname(resolvedOutput);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const isLandscape = orientation.toLowerCase() === 'landscape';
  const width = isLandscape ? 3508 : 2480;
  const height = isLandscape ? 2480 : 3508;

  const chromePath = getExecutablePath();
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--font-render-hinting=max',
      '--enable-font-antialiasing',
      '--force-color-profile=srgb'
    ]
  });

  try {
    const page = await browser.newPage();

    // Set high-res 300 DPI viewport
    await page.setViewport({
      width: isLandscape ? 1123 : 794,
      height: isLandscape ? 794 : 1123,
      deviceScaleFactor: 3.125
    });

    // Navigate to file URL
    const fileUrl = `file://${resolvedInput.replace(/\\/g, '/')}`;
    await page.goto(fileUrl, { waitUntil: ['load', 'networkidle0'], timeout: 30000 });

    // Wait for webfonts to finish rendering
    await page.evaluateHandle('document.fonts.ready');

    // Optional wait selector (e.g., #canvas-ready or .rendered)
    if (waitSelector) {
      await page.waitForSelector(waitSelector, { timeout: 10000 });
    }

    if (waitTimeout > 0) {
      await new Promise(resolve => setTimeout(resolve, waitTimeout));
    }

    // Capture screenshot
    let clipArea = null;
    if (selector) {
      const element = await page.$(selector);
      if (element) {
        await element.screenshot({
          path: resolvedOutput,
          omitBackground: Boolean(omitBackground)
        });
        console.log(`[OK] Rendered element '${selector}' to ${resolvedOutput}`);
        return resolvedOutput;
      }
    }

    await page.screenshot({
      path: resolvedOutput,
      omitBackground: Boolean(omitBackground),
      clip: {
        x: 0,
        y: 0,
        width: isLandscape ? 1123 : 794,
        height: isLandscape ? 794 : 1123
      }
    });

    console.log(`[OK] Successfully rendered A4 (${orientation}, 300 DPI) -> ${resolvedOutput}`);
    return resolvedOutput;
  } finally {
    await browser.close();
  }
}

// CLI Execution Support
if (process.argv[1] && process.argv[1].endsWith('html_to_a4_png.js')) {
  const args = process.argv.slice(2);
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
Usage: node html_to_a4_png.js <input.html> [options]

Options:
  --output, -o <file.png>       Target PNG file (default: input with .png)
  --landscape, -l               Render as A4 landscape (3508x2480 @ 300 DPI)
  --transparent, -t             Omit background (transparent cutouts)
  --selector, -s <css-selector> Capture only matching element
  --wait-selector <selector>    Wait until selector is present
  --wait-time <ms>              Wait milliseconds before snapping (default: 1500)
    `);
    process.exit(0);
  }

  const inputPath = args[0];
  let outputPath = null;
  let orientation = 'portrait';
  let omitBackground = false;
  let selector = null;
  let waitSelector = null;
  let waitTimeout = 1500;

  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--output' || arg === '-o') outputPath = args[++i];
    else if (arg === '--landscape' || arg === '-l') orientation = 'landscape';
    else if (arg === '--transparent' || arg === '-t') omitBackground = true;
    else if (arg === '--selector' || arg === '-s') selector = args[++i];
    else if (arg === '--wait-selector') waitSelector = args[++i];
    else if (arg === '--wait-time') waitTimeout = parseInt(args[++i], 10);
  }

  renderHtmlToA4Png({
    inputPath,
    outputPath,
    orientation,
    omitBackground,
    selector,
    waitSelector,
    waitTimeout
  }).catch(err => {
    console.error('[Error] Render failed:', err);
    process.exit(1);
  });
}
