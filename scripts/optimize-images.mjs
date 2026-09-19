import sharp from 'sharp';
import { readdir, mkdir, access } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';

const PUBLIC_DIR = './public';

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function getFileSizeKB(path) {
  const { size } = await sharp(path).metadata().then(() => {
    const fs = require('node:fs');
    return fs.statSync(path);
  });
  return (size / 1024).toFixed(1);
}

// We'll use a simpler approach for file size
import fs from 'node:fs';

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

async function optimizeImages() {
  console.log('\n🖼️  Image Optimization Script\n');
  console.log('='.repeat(70));

  const files = await readdir(PUBLIC_DIR);
  const imageFiles = files.filter(f => {
    const ext = extname(f).toLowerCase();
    return ext === '.png' || ext === '.jpg' || ext === '.jpeg';
  });

  console.log(`Found ${imageFiles.length} images to optimize\n`);

  let totalOriginal = 0;
  let totalAvif = 0;
  let totalWebp = 0;
  let totalPlaceholder = 0;

  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    const filePath = join(PUBLIC_DIR, file);
    const name = basename(file, extname(file));

    const originalStat = fs.statSync(filePath);
    totalOriginal += originalStat.size;
    const originalSizeStr = formatSize(originalStat.size);

    process.stdout.write(`[${i + 1}/${imageFiles.length}] ${name} (${originalSizeStr}) ... `);

    try {
      const img = sharp(filePath);
      const metadata = await img.metadata();

      // Generate AVIF
      const avifPath = join(PUBLIC_DIR, `${name}.avif`);
      await sharp(filePath)
        .avif({ quality: 75, effort: 4 })
        .toFile(avifPath);
      const avifStat = fs.statSync(avifPath);
      totalAvif += avifStat.size;

      // Generate WebP
      const webpPath = join(PUBLIC_DIR, `${name}.webp`);
      await sharp(filePath)
        .webp({ quality: 80 })
        .toFile(webpPath);
      const webpStat = fs.statSync(webpPath);
      totalWebp += webpStat.size;

      // Generate placeholder (tiny blurred WebP)
      const placeholderPath = join(PUBLIC_DIR, `${name}-placeholder.webp`);
      const thumbWidth = 40;
      const thumbHeight = Math.round((parseInt(metadata.height) || 300) / (parseInt(metadata.width) || 400) * thumbWidth);
      await sharp(filePath)
        .resize(thumbWidth, thumbHeight > 0 ? thumbWidth : thumbWidth, { fit: 'cover' })
        .blur(8)
        .webp({ quality: 30 })
        .toFile(placeholderPath);
      const placeholderStat = fs.statSync(placeholderPath);
      totalPlaceholder += placeholderStat.size;

      const savings = ((1 - (avifStat.size + webpStat.size + placeholderStat.size) / (originalStat.size * 3)) * 100).toFixed(0);
      console.log(`✓ AVIF: ${formatSize(avifStat.size)} | WebP: ${formatSize(webpStat.size)} | Placeholder: ${formatSize(placeholderStat.size)}`);
    } catch (err) {
      console.log(`✗ Error: ${err.message}`);
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('\n📊 Summary:');
  console.log(`   Original total:    ${formatSize(totalOriginal)}`);
  console.log(`   AVIF total:        ${formatSize(totalAvif)} (${((1 - totalAvif / totalOriginal) * 100).toFixed(0)}% smaller)`);
  console.log(`   WebP total:        ${formatSize(totalWebp)} (${((1 - totalWebp / totalOriginal) * 100).toFixed(0)}% smaller)`);
  console.log(`   Placeholder total: ${formatSize(totalPlaceholder)}`);
  console.log(`   Files generated:   ${imageFiles.length * 3} (${imageFiles.length} AVIF + ${imageFiles.length} WebP + ${imageFiles.length} placeholders)`);
  console.log('\n✅ Done!\n');
}

optimizeImages().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
