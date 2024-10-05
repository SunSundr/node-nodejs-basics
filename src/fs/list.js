import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { output } from './../output.js';

const folderPath = path.join(dirname(fileURLToPath(import.meta.url)), 'files');
const msgPrefix = 'FS operation';

const list = async () => {
    try {
        const files = await fs.readdir(folderPath);
        console.log(output('green', `[Done] ${msgPrefix} success`));
        console.log(`The '${folderPath}' folder contains the ${files.length} files:`);
        files.forEach((file) => console.log(output('cyan', `- ${file}`)));
        console.log('\n');
    } catch (err) {
        console.error(output('red', `[Error] ${msgPrefix} failed:`),  err.message, '\n');
    }
};

await list();