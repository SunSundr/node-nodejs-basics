import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { output } from './../output.js';
import { THROW_ERROR } from  './../config.js';

const folderPath = path.join(dirname(fileURLToPath(import.meta.url)), 'files');
const msgPrefix = 'FS operation';

const list = async () => {
  console.log(output('green', '*** Folder content ***'));
  console.log('-'.repeat(80));
  try {
    const files = await fs.readdir(folderPath);
    console.log(output('green', `[Done] ${msgPrefix} success`));
    console.log(`The '${folderPath}' folder contains the ${files.length} files:`);
    // files.forEach((file) => console.log(output('cyan', `| ${file}`)));
    console.log(files, '\n');
  } catch (err) {
    console.error(output('red', `[Error] ${msgPrefix} failed:`), err.message, '\n');
    if (THROW_ERROR) throw new Error('FS operation failed');
  }
};

await list();
