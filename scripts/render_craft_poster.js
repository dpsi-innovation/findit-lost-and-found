import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1123, height: 794, deviceScaleFactor: 2 });
  const htmlPath = path.resolve('poster_output/real_craft_poster_cutouts.html');
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');

  // 1. Render Multi-page PDF
  const pdfPath = path.resolve('poster_output/PHYSICAL_POSTER_CUTOUT_PACK.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    landscape: true,
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });
  console.log('Rendered PDF:', pdfPath, 'Size:', fs.statSync(pdfPath).size);

  // 2. Render Page Screenshots
  const outDir = path.resolve('poster_output/craft_pages');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const brainDir = 'C:\\Users\\D&T\\.gemini\\antigravity\\brain\\13b0a123-cc89-4ed6-9827-ddc94afe4107';

  const sheets = await page.$$('.sheet-page');
  console.log('Found sheets:', sheets.length);

  for (let i = 0; i < sheets.length; i++) {
    const pngName = `Cutout_Sheet_${i + 1}.png`;
    const outPath = path.join(outDir, pngName);
    await sheets[i].screenshot({ path: outPath });
    console.log('Rendered:', pngName);

    // Also copy to brain directory for artifact viewing
    fs.copyFileSync(outPath, path.join(brainDir, pngName));
  }

  // Copy PDF to brain directory
  fs.copyFileSync(pdfPath, path.join(brainDir, 'PHYSICAL_POSTER_CUTOUT_PACK.pdf'));

  await browser.close();
  console.log('Done rendering craft cutout pack!');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
