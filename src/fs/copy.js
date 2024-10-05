import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { output } from './../output.js';

const srcDir = path.join(dirname(fileURLToPath(import.meta.url)), 'files');
const destDir = `${srcDir}_copy`;
const msgPrefix = 'FS operation';

const copy = async () => {
    try {
        await fs.mkdir(destDir);
        await fs.cp(srcDir, destDir, { recursive: true, force: false, errorOnExist: true });
        console.log(output('green', `${msgPrefix} success:`),  `folder '${destDir}' has been copied\n`);
    } catch (err) {
        console.error(output('red', `${msgPrefix} failed:`),  err.message, '\n');
    }
};

await copy();
