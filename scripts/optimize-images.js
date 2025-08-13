import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SIZES = {
  thumbnail: 300,
  full: 1200
};

const QUALITY = {
  jpeg: 85,
  webp: 80
};

async function optimizeImage(inputPath, outputDir, filename, sizeName, sizeValue) {
  try {
    const outputPath = path.join(outputDir, `${filename}-${sizeName}`);
    
    // Создаем JPEG версию
    await sharp(inputPath)
      .resize(sizeValue, null, { 
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({ quality: QUALITY.jpeg, progressive: true })
      .toFile(`${outputPath}.jpg`);
    
    // Создаем WebP версию
    await sharp(inputPath)
      .resize(sizeValue, null, { 
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: QUALITY.webp, lossless: false })
      .toFile(`${outputPath}.webp`);
    
    console.log(`✓ Оптимизировано: ${filename} (${sizeName}px)`);
  } catch (error) {
    console.error(`✗ Ошибка при оптимизации ${filename}:`, error.message);
  }
}

async function processDirectory(inputDir, outputDir) {
  try {
    // Создаем выходную директорию если её нет
    await fs.mkdir(outputDir, { recursive: true });
    
    const files = await fs.readdir(inputDir);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png)$/i.test(file) && !file.startsWith('.')
    );
    
    console.log(`Найдено ${imageFiles.length} изображений в ${inputDir}`);
    
    for (const file of imageFiles) {
      const inputPath = path.join(inputDir, file);
      const filename = path.parse(file).name;
      
      // Оптимизируем для каждого размера
      for (const [sizeName, sizeValue] of Object.entries(SIZES)) {
        await optimizeImage(inputPath, outputDir, filename, sizeName, sizeValue);
      }
    }
    
    console.log('✅ Оптимизация завершена!');
  } catch (error) {
    console.error('❌ Ошибка при обработке директории:', error.message);
  }
}

// Основные изображения
await processDirectory(
  path.join(__dirname, '../src/assets'),
  path.join(__dirname, '../public/images')
);

// Портфолио
await processDirectory(
  path.join(__dirname, '../src/assets/portfolio'),
  path.join(__dirname, '../public/images/portfolio')
);
