import fs from 'node:fs';
import zlib from 'node:zlib';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { output } from './../output.js';


const dirPath = path.join(dirname(fileURLToPath(import.meta.url)), 'files')
const inputFilePath = path.join(dirPath, 'fileToCompress.txt');
const outputFilePath = path.join(dirPath, 'archive.gz');

const compress = async () => {
    const deleteOutputFile = async () => {
        try {
            await fs.promises.unlink(outputFilePath);
            console.log(output('yellow', 'The output file has been deleted.\n'));
        } catch (err) {
            console.error(output('red', 'Error deleting output file:'), err.message);
        }
    };

    const gzip = zlib.createGzip();
    const source = fs.createReadStream(inputFilePath);
    const destination = fs.createWriteStream(outputFilePath);

    source.pipe(gzip).pipe(destination);

    console.log(output('green', `Compresses file using zlib and Streams API:`));

    destination.on('finish', () => {
        console.log(output('cyan', `File '${inputFilePath}' has been compressed\nto '${outputFilePath}'`));
        console.log(output('green', '[Done]\n'));
    });

    source.on('error', (err) => {
        console.error(output('red', 'Error reading the input file:'), err.message);
        deleteOutputFile();
    });

    gzip.on('error', (err) => {
        console.error(output('red', 'Error during compression:'), err.message);
        deleteOutputFile();
    });

    destination.on('error', (err) => {
        console.error(output('red', 'Error writing the output file:'), err.message);
        deleteOutputFile();
    });
};

await compress();