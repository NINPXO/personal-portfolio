import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const dataDir = path.join(rootDir, 'data');
const targetDir = path.join(rootDir, 'packages', 'portfolio', 'src', 'data');

async function copyData() {
  try {
    // Create target directory if it doesn't exist
    await fs.mkdir(targetDir, { recursive: true });

    // Copy all JSON files from data/ to packages/portfolio/src/data/
    const files = await fs.readdir(dataDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    for (const file of jsonFiles) {
      const src = path.join(dataDir, file);
      const dest = path.join(targetDir, file);
      await fs.copyFile(src, dest);
      console.log(`✓ Copied ${file}`);
    }

    console.log(`✓ Data files copied successfully to packages/portfolio/src/data/`);
  } catch (error) {
    console.error('Error copying data files:', error);
    process.exit(1);
  }
}

copyData();
