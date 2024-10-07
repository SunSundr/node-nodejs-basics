import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { output } from './../output.js';

const filePath = path.join(dirname(fileURLToPath(import.meta.url)), 'files', 'fresh.txt');
const fileContent = 'I am fresh and young';
const msgPrefix = 'FS operation';

const create = async () => {
  console.log(output('green', '*** Create file ***'));
  console.log('-'.repeat(120));
  try {
    await fs.writeFile(filePath, fileContent, { flag: 'wx+' });
    console.log(
      output('green', `[Done] ${msgPrefix} success:`),
      `file '${filePath}' has been created\n`
    );
  } catch (err) {
    console.error(
      output('red', `[Error] ${msgPrefix} failed:`),
      err.message,
      '\n'
    );
  }
};

await create();
