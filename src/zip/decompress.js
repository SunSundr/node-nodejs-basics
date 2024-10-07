import fs from 'node:fs';
import zlib from 'node:zlib';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { output } from './../output.js';

const dirPath = path.join(dirname(fileURLToPath(import.meta.url)), 'files');
const inputFilePath = path.join(dirPath, 'archive.gz');
const outputFilePath = path.join(dirPath, 'fileToCompress.txt');

const decompress = async () => {
  const gunzip = zlib.createGunzip();
  const source = fs.createReadStream(inputFilePath);
  const destination = fs.createWriteStream(outputFilePath);

  source.pipe(gunzip).pipe(destination);

  console.log(output('green', '*** Decompresses file using zlib and Streams API ***'));
  console.log('-'.repeat(70));

  const isExist = await fs.promises
    .access(outputFilePath, fs.constants.W_OK)
    .then(() => true)
    .catch(() => false);
  if (isExist)
    console.log(output('yellow', '[Warn] The output file exists and will be overwritten'));

  const deleteOutputFile = async () => {
    if (isExist) {
      console.log();
      return;
    }
    try {
      await fs.promises.unlink(outputFilePath);
      console.log(output('yellow', 'The output file has been deleted.\n'));
    } catch (err) {
      console.error(output('red', 'Error deleting output file:'), err.message);
    }
  };

  destination.on('finish', () => {
    console.log(
      output('cyan', `File '${inputFilePath}' has been decompressed\nto '${outputFilePath}'`)
    );
    console.log(output('green', '[Done]\n'));
  });

  source.on('error', (err) => {
    console.error(output('red', '[Error] Reading the input file failed:'), err.message);
    deleteOutputFile();
  });

  gunzip.on('error', (err) => {
    console.error(output('red', '[Error] During decompression failed:'), err.message);
    deleteOutputFile();
  });

  destination.on('error', (err) => {
    console.error(output('red', '[Error] Writing the output file failed:'), err.message);
    deleteOutputFile();
  });
};

decompress();
