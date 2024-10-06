import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import readline from 'node:readline';
import { Worker } from 'node:worker_threads';
import os from 'node:os';
import { output } from './../output.js';

const workerPath = path.join(dirname(fileURLToPath(import.meta.url)), 'worker.js');
const incrementStart = 10;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const askQuestion = (question) => {
    return new Promise((resolve) => rl.question(question, resolve));
};

const performCalculations = async () => {
    console.log(output('green', '*** Worker Threads ***'));
    console.log('-'.repeat(70));
    const answer = await askQuestion('Generate random errors? (yes/No): ');
    const allowErrors = /^(yes|y)$/i.test(answer.trim());
    rl.close();
    console.log('Using allow errors is', allowErrors, '\n');

    const numCPUs = os.cpus().length;
    const workers = [];
    const workerInstances = [];
    const errors = [];

    for (let i = 0; i < numCPUs; i++) {
        workers.push(new Promise((resolve) => {
            const worker = new Worker(workerPath);
            workerInstances.push(worker);
            const numberToSend = incrementStart + i;

            worker.postMessage({ num: numberToSend, allowErrors });

            worker.on('message', (result) => {
                resolve({ status: 'resolved', data: result });
            });

            worker.on('error', (err) => {
                resolve({ status: 'error', data: null });
                errors.push({err, i});
            });

            worker.on('exit', (code) => {
                if (code !== 0) {
                    resolve({ status: 'error', data: null });
                }
            });
        }));
    }

    const workerResults = await Promise.all(workers);
    console.log(output('cyan', 'Thread results:'))
    console.log(workerResults);
    if (errors.length) {
        console.error(errors.map((data) => {
            return `${output('red', '[Error]')} ${data.err.message} (thread: ${data.i + 1})`;
        }).join('\n'));
    }
    console.log(output('green', '\n[Done]\n'));
    workerInstances.forEach((worker) => worker.terminate());
};

await performCalculations();
