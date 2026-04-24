const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputDir = 'C:/Users/ruby/.qclaw/workspace/truthlens-web/screenshots';
const outputDir = 'C:/Users/ruby/.qclaw/workspace/truthlens-web/screenshots/output';

const maxWidth = 1080;
const maxHeight = 1920;
const minWidth = 320;
const minHeight = 480;

async function resizeImage(filename) {
  const inputPath = path.join(inputDir, filename);
  const outputFilename = filename.replace('.png', '_resized.png');
  const outputPath = path.join(outputDir, outputFilename);
  
  const metadata = await sharp(inputPath).metadata();
  console.log(`Processing ${filename}: ${metadata.width}x${metadata.height}`);
  
  let width = metadata.width;
  let height = metadata.height;
  
  if (width > maxWidth) {
    height = Math.round(height * (maxWidth / width));
    width = maxWidth;
  }
  if (height > maxHeight) {
    width = Math.round(width * (maxHeight / height));
    height = maxHeight;
  }
  if (width < minWidth) {
    height = Math.round(height * (minWidth / width));
    width = minWidth;
  }
  if (height < minHeight) {
    width = Math.round(width * (minHeight / height));
    height = minHeight;
  }
  
  await sharp(inputPath)
    .resize(width, height)
    .png({ quality: 80 })
    .toFile(outputPath);
    
  const newMeta = await sharp(outputPath).metadata();
  const sizeKB = Math.round(fs.statSync(outputPath).size / 1024);
  console.log(`Resized to: ${newMeta.width}x${newMeta.height}, ${sizeKB}KB`);
}

async function main() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const files = ['screenshot-1.png', 'screenshot-2.png', 'screenshot-3.png'];
  
  for (const file of files) {
    await resizeImage(file);
  }
  
  console.log('\nAll screenshots resized to: ' + outputDir);
}

main().catch(console.error);
