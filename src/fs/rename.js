import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { output } from './../output.js';

const dirPath = path.join(dirname(fileURLToPath(import.meta.url)), 'files');
const filePathWrong = path.join(dirPath, 'wrongFilename.txt');
const filePathCorrect = path.join(dirPath, 'properFilename.md');
const msgPrefix = 'FS operation';

const rename = async () => {
  console.log(output('green', '*** Rename file ***'));
  console.log('-'.repeat(120));
  try {
    const isExist = await fs
      .access(filePathCorrect, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);
    if (isExist) throw new Error(`file '${filePathCorrect}' already exists`);

    await fs.rename(filePathWrong, filePathCorrect);
    console.log(
      output('green', `[Done] ${msgPrefix} success:`),
      `file '${path.basename(filePathWrong)}' has been renamed to '${filePathCorrect}'\n`
    );
  } catch (err) {
    console.error(output('red', `[Error] ${msgPrefix} failed:`), err.message, '\n');
  }
};

await rename();
