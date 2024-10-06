import path, { dirname } from 'node:path';
import { createServer as createServerHttp } from 'node:http';
import { readFile } from "node:fs/promises";
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import './files/c.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const srcDir = path.join(__dirname, 'files');

const random = Math.random();

/**
 * Dynamic import json
 * https://stackoverflow.com/questions/70601733/dynamic-import-with-json-file-doesnt-work-typescript
 * https://github.com/microsoft/TypeScript/issues/53656
 * 
 * Example:
 * const unknownObject = await import(`./files/${random > 0.5 ? 'a' : 'b'}.json`, { with: { type: 'json' }}); 
 * const unknownObject = await import(`./files/${random > 0.5 ? 'a' : 'b'}.json`, { assert: { type: 'json' }});
 */

// Best way to get the JSON in Node.js:
let unknownObject;
try {
  const json = await readFile(path.join(srcDir, `/${random > 0.5 ? 'a' : 'b'}.json`), 'utf8');
  unknownObject = JSON.parse(json);
} catch(err) {
  console.error(err);
  unknownObject = {};
}

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

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer };
