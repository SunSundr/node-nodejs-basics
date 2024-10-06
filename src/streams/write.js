import fs from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { output } from './../output.js';

const filePath = path.join(dirname(fileURLToPath(import.meta.url)), 'files', 'fileToWrite.txt');
const linePrefix = '> ';
const streamEnd = 'END';

const write = async () => {
    const writableStream = fs.createWriteStream(filePath);
    let num = 0;
    const formatPrefix = () => `${(++num).toString().padStart(2, '0')}${linePrefix}`;

    writableStream.on('open', () => {
        process.stdout.write(
            output('green', `The stream is open for writing to a file "${path.basename(filePath)}"\n`) + 
            output('cyan', 'Please click on this terminal window and start typing your input.\n' +
                `If you enter "${streamEnd}", the stream will end.\n`) + 
            '-'.repeat(80) + '\n' + formatPrefix());
    });

    process.stdin.on('data', (chunk) => {
        process.stdout.write(formatPrefix());
        if (chunk.toString().trim() === streamEnd) {
            process.stdin.unpipe(writableStream);
            process.stdout.write(output('green', '\n[Done]\n\n'));
            setTimeout(() => writableStream.end());
        }
    });
    
    writableStream.on('error', (err) => {
        process.stderr.write(`${output('red', `[Error] Writing to file "${path.basename(filePath)}" failed:`)}\n${err.message}\n\n`);
    });

    process.stdin.pipe(writableStream);
};

await write();