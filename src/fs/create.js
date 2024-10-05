import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { output } from './../output.js';

const filePath = path.join(dirname(fileURLToPath(import.meta.url)), 'files', 'fresh.txt');
const fileContent = 'I am fresh and young';
const msgPrefix = 'FS operation';

const create = async () => {
    try {
        await fs.writeFile(filePath, fileContent, { flag: 'wx+' });
        console.log(output('green', `${msgPrefix} success:`),  `file '${filePath}' has been created\n`);
    } catch (err) {
        console.error(output('red', `${msgPrefix}:`),  err.code === 'EEXIST' ? 'file already exists' : err.message, '\n');
    }
};

await create();
