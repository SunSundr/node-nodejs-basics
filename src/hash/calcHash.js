import crypto from 'crypto';
import fs from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { output } from './../output.js';

const filePath = path.join(
  dirname(fileURLToPath(import.meta.url)),
  'files',
  'fileToCalculateHashFor.txt'
);

const calculateHash = async () => {
  const hash = crypto.createHash('sha256');
  const stream = fs.createReadStream(filePath);

  stream.on('data', (chunk) => {
    hash.update(chunk);
  });

  stream.on('end', () => {
    const result = hash.digest('hex');
    console.log(output('green', `[Done] SHA256 hash for file "${path.basename(filePath)}":`));
    console.log(output('cyan', result), '\n');
  });

  stream.on('error', (err) => {
    console.error(
      output(
        'red',
        `[Error] Calculation SHA256 hash for file "${path.basename(filePath)}" failed:\n`
      ),
      err.message,
      '\n'
    );
  });
};

await calculateHash();
