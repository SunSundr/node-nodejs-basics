import path, { dirname } from 'node:path';
import { createServer as createServerHttp } from 'node:http';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import './files/c.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const srcDir = path.join(__dirname, 'files');

const random = Math.random();
const unknownObject = path.join(srcDir, `${random > 0.5 ? 'a' : 'b'}.json` );

console.log(`Release ${os.release()}`);
console.log(`Version ${os.version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);


const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

myServer.on('error', (err) => {
    console.error(`Server error: ${err.message}`);
});

const PORT = 3000;

console.log('unknownObject is', unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export {unknownObject, myServer}; 