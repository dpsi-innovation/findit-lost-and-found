import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

async function renderPages() {
  const outDir = path.resolve('poster_output/pages');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1123, height: 794, deviceScaleFactor: 2 });
  const filePath = path.resolve('poster_output/all_cutouts_printable.html');
  await page.goto('file:///' + filePath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
  await page.evaluateHandle('document.fonts.ready');

  const sheets = await page.$$('.page-sheet');
  console.log('Found page sheets:', sheets.length);

  for (let i = 0; i < sheets.length; i++) {
    const outPath = path.join(outDir, `Page_${i + 1}.png`);
    await sheets[i].screenshot({ path: outPath });
    console.log(`Rendered Page_${i + 1}.png`);
  }

  await browser.close();
}

renderPages().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
