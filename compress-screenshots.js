const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'C:/Users/ruby/.qclaw/workspace/truthlens-web/screenshots-final';
const outputDir = 'C:/Users/ruby/.qclaw/workspace/truthlens-web/screenshots-upload';

const screenshots = [
  'screenshot-1-home.png',
  'screenshot-2-result.png',
  'screenshot-3-features.png',
  'screenshot-4-history.png',
  'screenshot-5-settings.png'
];

async function compressImage(filename) {
  const inputPath = path.join(inputDir, filename);
  const outputFilename = filename.replace('.png', '.jpg');
  const outputPath = path.join(outputDir, outputFilename);
  
  const metadata = await sharp(inputPath).metadata();
  console.log(`Processing ${filename}: ${metadata.width}x${metadata.height}`);
  
  await sharp(inputPath)
    .resize(1080, 1920, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 85, progressive: true })
    .toFile(outputPath);
  
  const sizeKB = Math.round(fs.statSync(outputPath).size / 1024);
  console.log(`✅ Compressed to: ${outputFilename} (${sizeKB}KB)`);
  
  return { name: outputFilename, size: sizeKB };
}

async function main() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const results = [];
  for (const file of screenshots) {
    const result = await compressImage(file);
    results.push(result);
  }
  
  console.log('\n🎉 All screenshots compressed!');
  console.log('\n📊 Summary:');
  console.log('─'.repeat(40));
  results.forEach(r => {
    const status = r.size <= 1024 ? '✅' : '⚠️';
    console.log(`${status} ${r.name}: ${r.size}KB`);
  });
  console.log('─'.repeat(40));
  console.log(`\n📁 Upload files from: ${outputDir}`);
}

main().catch(console.error);
