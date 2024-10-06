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
            console.error(output('red', '[Error] Removing the output file failed:'), err.message);
        }
    };

    const gzip = zlib.createGzip();
    const source = fs.createReadStream(inputFilePath);
    const destination = fs.createWriteStream(outputFilePath);

    console.log(output('green', '*** Compresses file using zlib and Streams API ***\n'));

    const isExist = await fs.promises.access(outputFilePath, fs.constants.W_OK).then(() => true).catch(() => false);
    if (isExist) console.log(output('yellow', '[Warn] The output file exists and will be overwritten'));

    source.pipe(gzip).pipe(destination);

    destination.on('finish', () => {
        console.log(output('cyan', `File '${inputFilePath}' has been compressed\nto '${outputFilePath}'`));
        console.log(output('green', '[Done]\n'));
    });

    source.on('error', (err) => {
        console.error(output('red', '[Error] Reading the input file failed:'), err.message);
        deleteOutputFile();
    });

    gzip.on('error', (err) => {
        console.error(output('red', '[Error] During compression failed:'), err.message);
        deleteOutputFile();
    });

    destination.on('error', (err) => {
        console.error(output('red', '[Error] Writing the output file failed:'), err.message);
        deleteOutputFile();
    });
};

await compress();