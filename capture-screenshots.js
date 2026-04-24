const puppeteer = require('puppeteer-core');
const path = require('path');

const templates = [
  { name: 'screenshot-1-home', file: 'screenshot-1-home.html' },
  { name: 'screenshot-2-result', file: 'screenshot-2-result.html' },
  { name: 'screenshot-3-features', file: 'screenshot-3-features.html' },
  { name: 'screenshot-4-history', file: 'screenshot-4-history.html' },
  { name: 'screenshot-5-settings', file: 'screenshot-5-settings.html' }
];

const templateDir = 'C:/Users/ruby/.qclaw/workspace/truthlens-web/screenshots-template';
const outputDir = 'C:/Users/ruby/.qclaw/workspace/truthlens-web/screenshots-final';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function captureScreenshot(template) {
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    headless: 'new',
    defaultViewport: { width: 1080, height: 1920 }
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920 });
  
  const filePath = `file:///${templateDir}/${template.file}`;
  await page.goto(filePath, { waitUntil: 'networkidle0' });
  
  // Wait for fonts to load
  await sleep(1000);
  
  const outputPath = path.join(outputDir, `${template.name}.png`);
  await page.screenshot({
    path: outputPath,
    fullPage: false,
    clip: { x: 0, y: 0, width: 1080, height: 1920 }
  });
  
  console.log(`✅ Captured: ${template.name}.png`);
  
  await browser.close();
}

async function main() {
  const fs = require('fs');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  for (const template of templates) {
    await captureScreenshot(template);
  }
  
  console.log('\n🎉 All 5 screenshots captured!');
  console.log(`📁 Output: ${outputDir}`);
}

main().catch(console.error);
