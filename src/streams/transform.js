import { Transform } from 'node:stream';
import { output } from './../output.js';

const linePrefix = '> ';
const streamEnd = 'END';

const transform = async () => {
    let num = 0;
    const formatPrefix = () => `${(++num).toString().padStart(2, '0')}${linePrefix}`;

    const reverseStream = new Transform({
        transform(chunk, _encoding, callback) {
          const data = chunk.toString().trim();
          const reversed = data.split('').reverse().join('') + '\n';
          callback(null, reversed);
        }
    });

    process.stdout.write(
        output('green', `The transform stream is open.\n`) + 
        output('cyan', 'Please click on this terminal window and start typing your input.\n' + 
            `If you enter "${streamEnd}", the stream will end.\n`) +
        '-'.repeat(80) + '\n' + formatPrefix());

    process.stdin
        .pipe(reverseStream)
        .pipe(process.stdout);


    reverseStream.on('error', (err) => {
        console.error('Error transforming input:', err);
    });

    process.stdin.on('error', (err) => {
        console.error('Error reading input:', err);
    });

    process.stdout.on('error', (err) => {
        console.error('Error writing output:', err);
    });

    process.stdin.on('data', (chunk) => {
        process.stdout.write(formatPrefix());
        if (chunk.toString().trim() === streamEnd) {
            process.stdin.unpipe(reverseStream);
            reverseStream.end();
            process.stdout.write(output('green','\n[Done]\n\n'));
        }
    });
};

await transform();
