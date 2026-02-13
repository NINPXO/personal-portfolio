import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// DATA_DIR points to the root data/ folder: 3 levels up from src/
export const DATA_DIR = path.join(__dirname, '..', '..', '..', 'data');

console.log(`Data directory: ${DATA_DIR}`);
