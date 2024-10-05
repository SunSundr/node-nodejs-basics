import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { output } from './../output.js';

const filePath = path.join(dirname(fileURLToPath(import.meta.url)), 'files', 'fresh.txt');
const fileContent = 'I am fresh and young';

const create = async () => {
    try {
        await fs.writeFile(filePath, fileContent, { flag: 'wx+' });
        console.log(output('green', `FS operation success:`),  `file "${filePath}" has been created\n`);

    } catch (err) {
        console.error(output('red', `FS operation failed:`),  err.code === 'EEXIST' ? 'file already exists' : err.message, '\n');
    }
};

await create();
