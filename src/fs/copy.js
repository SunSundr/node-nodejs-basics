import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { output } from './../output.js';
import { THROW_ERROR } from  './../config.js';

const srcDir = path.join(dirname(fileURLToPath(import.meta.url)), 'files');
const destDir = `${srcDir}_copy`;
const msgPrefix = 'FS operation';

const copy = async () => {
  console.log(output('green', '*** Copy folder ***'));
  console.log('-'.repeat(120));
  try {
    await fs.mkdir(destDir);
    await fs.cp(srcDir, destDir, { recursive: true, force: false, errorOnExist: true });
    console.log(
      output('green', `[Done] ${msgPrefix} success:`),
      `folder '${destDir}' has been copied\n`
    );
  } catch (err) {
    console.error(output('red', `[Error] ${msgPrefix} failed:`), err.message, '\n');
    if (THROW_ERROR) throw new Error('FS operation failed');
  }
};

await copy();
