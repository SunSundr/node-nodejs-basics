import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { output } from './../output.js';

const filePath = path.join(dirname(fileURLToPath(import.meta.url)), 'files', 'fileToRemove.txt');
const msgPrefix = 'FS operation';

const remove = async () => {
  try {
    await fs.unlink(filePath);
    console.log(
      output('green', `[Done] ${msgPrefix} success:`),
      `file '${filePath}' has been removed\n`
    );
  } catch (err) {
    console.error(output('red', `[Error] ${msgPrefix} failed:`), err.message, '\n');
  }
};

await remove();
