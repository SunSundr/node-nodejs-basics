import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { output } from './../output.js';
import { THROW_ERROR } from  './../config.js';

const filePath = path.join(dirname(fileURLToPath(import.meta.url)), 'files', 'fileToRead.txt');
const msgPrefix = 'FS operation';

const read = async () => {
  console.log(output('green', '*** Read file ***'));
  console.log('-'.repeat(80));
  try {
    const content = await fs.readFile(filePath, { encoding: 'utf-8' });
    console.log(output('green', `[Done] ${msgPrefix} success`));
    console.log(`Contents of the file '${filePath}':`);
    console.log(output('cyan', content), '\n');
  } catch (err) {
    console.error(output('red', `[Error] ${msgPrefix} failed:`), err.message, '\n');
    if (THROW_ERROR) throw new Error('FS operation failed');
  }
};

await read();
