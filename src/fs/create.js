import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const filePath = path.join(dirname(fileURLToPath(import.meta.url)), 'files', 'fresh.txt');
const fileContent = 'I am fresh and young';
const msgPrefix = 'FS operation';

const create = async () => {
    try {
        await fs.writeFile(filePath, fileContent, { flag: 'wx+' });
        console.log(`${msgPrefix} success: file "${filePath}" has been created`);
    } catch (err) {
        console.error(`${msgPrefix} failed: `,  err.code === 'EEXIST' ? 'file already exists' : err.message);
    }
};

await create();
