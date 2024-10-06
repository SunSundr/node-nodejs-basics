import { parentPort } from 'node:worker_threads';

// n should be received from main thread
const nthFibonacci = (n) => (n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2));

// This function sends result of nthFibonacci computations to main thread
const sendResult = () => {
  parentPort.on('message', ({ num, allowErrors }) => {
    if (allowErrors && Math.random() < 0.3) {
      throw new Error('Random error occurred');
    } else {
      const result = nthFibonacci(num);
      parentPort.postMessage(result);
    }
  });
};

sendResult();
