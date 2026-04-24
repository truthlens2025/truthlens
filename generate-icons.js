// Generate TruthLens App Icons (SVG to PNG)
const fs = require('fs');

// SVG icon template - a magnifying glass with gradient
const createSvgIcon = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#7c6aff"/>
      <stop offset="100%" style="stop-color:#ff6a9e"/>
    </linearGradient>
    <linearGradient id="glass" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ffffff"/>
      <stop offset="100%" style="stop-color:#e0e0e0"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.22}" fill="url(#bg)"/>
  <g transform="translate(${size * 0.15}, ${size * 0.15})">
    <circle cx="${size * 0.28}" cy="${size * 0.28}" r="${size * 0.24}" fill="none" stroke="url(#glass)" stroke-width="${size * 0.065}"/>
    <line x1="${size * 0.45}" y1="${size * 0.45}" x2="${size * 0.62}" y2="${size * 0.62}" stroke="url(#glass)" stroke-width="${size * 0.065}" stroke-linecap="round"/>
    <circle cx="${size * 0.28}" cy="${size * 0.28}" r="${size * 0.16}" fill="rgba(255,255,255,0.15)"/>
  </g>
</svg>`;

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

sizes.forEach(size => {
  fs.writeFileSync(`icons/icon-${size}.svg`, createSvgIcon(size));
  console.log(`Created icon-${size}.svg`);
});

console.log('SVG icons created! Convert to PNG using:');
console.log('npm install -g sharp');
console.log('npx sharp icons/icon-512.svg icons/icon-512.png');
