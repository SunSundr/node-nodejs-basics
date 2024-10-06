import fs from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { output } from './../output.js';

const filePath = path.join(dirname(fileURLToPath(import.meta.url)), 'files', 'fileToRead.txt');

const read = async () => {
    const stream = fs.createReadStream(filePath);
    // stream.pipe(process.stdout);

    stream.on('open', () => {
        process.stdout.write(output('green', `Started reading the file "${path.basename(filePath)}"... | content:\n`));
    });

    stream.on('data', (chunk) => {
        process.stdout.write(output('cyan', chunk.toString()));
    });

    stream.on('end', () => {
        process.stdout.write(output('green','\n[Done]\n\n'));
    });

    stream.on('error', (err) => {
        process.stderr.write(`${output('red', `[Error] Reading file "${path.basename(filePath)}":`)}\n${err.message}\n\n`);
    });
};

await read();