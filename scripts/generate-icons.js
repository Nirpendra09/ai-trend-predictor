const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const sizes = [
  16,  // favicon
  32,  // favicon
  180, // apple-touch-icon
  192, // android
  512  // android & og-image
];

async function generateIcons() {
  const svgBuffer = await fs.readFile(path.join(__dirname, '../public/icon.svg'));
  
  // Generate PNG icons
  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(__dirname, `../public/icon-${size}x${size}.png`));
    
    console.log(`Generated ${size}x${size} icon`);
  }
  
  // For favicon.ico, we'll just use the 32x32 PNG
  await fs.copyFile(
    path.join(__dirname, '../public/icon-32x32.png'),
    path.join(__dirname, '../public/favicon.ico')
  );
  
  console.log('Generated favicon.ico');
  
  // Generate OG image
  await sharp(svgBuffer)
    .resize(1200, 630, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .png()
    .toFile(path.join(__dirname, '../public/og-image.png'));
  
  console.log('Generated OG image');
  
  // Create apple-touch-icon
  await fs.copyFile(
    path.join(__dirname, '../public/icon-180x180.png'),
    path.join(__dirname, '../public/apple-touch-icon.png')
  );
  
  console.log('Generated apple-touch-icon');
}

generateIcons().catch(console.error); 