import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const sizes = {
  favicon: 32,
  appleTouchIcon: 180,
  icon192: 192,
  icon512: 512,
  ogImage: { width: 1200, height: 630 },
  screenshot: { width: 1080, height: 1920 }
};

async function generateSvgBuffer(width: number, height: number, content: string) {
  return Buffer.from(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      ${content}
    </svg>`
  );
}

async function generateImages() {
  // Create public directory if it doesn't exist
  const publicDir = path.join(process.cwd(), 'public');
  await fs.mkdir(publicDir, { recursive: true });

  // Generate logo SVG
  const logoSvg = await generateSvgBuffer(512, 512, `
    <rect width="512" height="512" rx="128" fill="#FF4D6D"/>
    <path d="M256 128C179.307 128 128 179.307 128 256C128 332.693 179.307 384 256 384C332.693 384 384 332.693 384 256C384 179.307 332.693 128 256 128ZM256 352C197.019 352 160 314.981 160 256C160 197.019 197.019 160 256 160C314.981 160 352 197.019 352 256C352 314.981 314.981 352 256 352Z" fill="white"/>
    <path d="M256 192C220.654 192 192 220.654 192 256C192 291.346 220.654 320 256 320C291.346 320 320 291.346 320 256C320 220.654 291.346 192 256 192ZM256 288C233.909 288 224 278.091 224 256C224 233.909 233.909 224 256 224C278.091 224 288 233.909 288 256C288 278.091 278.091 288 256 288Z" fill="white"/>
  `);

  // Generate icons from logo
  const baseImage = sharp(logoSvg);

  // Generate favicon.ico
  await baseImage
    .clone()
    .resize(sizes.favicon, sizes.favicon)
    .toFormat('png')
    .toFile(path.join(publicDir, 'favicon.ico'));

  // Generate apple-touch-icon.png
  await baseImage
    .clone()
    .resize(sizes.appleTouchIcon, sizes.appleTouchIcon)
    .toFormat('png')
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  // Generate icon-192x192.png
  await baseImage
    .clone()
    .resize(sizes.icon192, sizes.icon192)
    .toFormat('png')
    .toFile(path.join(publicDir, 'icon-192x192.png'));

  // Generate icon-512x512.png
  await baseImage
    .clone()
    .resize(sizes.icon512, sizes.icon512)
    .toFormat('png')
    .toFile(path.join(publicDir, 'icon-512x512.png'));

  // Generate og-image SVG
  const ogImageSvg = await generateSvgBuffer(sizes.ogImage.width, sizes.ogImage.height, `
    <rect width="${sizes.ogImage.width}" height="${sizes.ogImage.height}" fill="#FF4D6D"/>
    <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="48" font-weight="bold">
      WodBot - Seu Personal Trainer de IA
    </text>
    <text x="50%" y="60%" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="24">
      Treinos personalizados e planos nutricionais adaptados às suas necessidades
    </text>
  `);

  // Generate og-image.png
  await sharp(ogImageSvg)
    .toFormat('png')
    .toFile(path.join(publicDir, 'og-image.png'));

  // Generate screenshot SVG
  const screenshotSvg = await generateSvgBuffer(sizes.screenshot.width, sizes.screenshot.height, `
    <rect width="${sizes.screenshot.width}" height="${sizes.screenshot.height}" fill="#FF4D6D"/>
    <text x="50%" y="40%" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="36" font-weight="bold">
      WodBot
    </text>
    <text x="50%" y="45%" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="24">
      Seu Personal Trainer de IA
    </text>
    <text x="50%" y="55%" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="20">
      Treinos personalizados e planos nutricionais adaptados às suas necessidades
    </text>
  `);

  // Generate screenshot-1.png
  await sharp(screenshotSvg)
    .toFormat('png')
    .toFile(path.join(publicDir, 'screenshot-1.png'));

  console.log('All images generated successfully!');
}

generateImages().catch(console.error); 