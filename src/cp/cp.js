import { spawn } from 'node:child_process';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { output } from './../output.js';

const filePath = path.join(dirname(fileURLToPath(import.meta.url)), 'files', 'script.js');

const spawnChildProcess = async (args) => {
  console.log(output('green', '*** Child Processes *** '));
  console.log('-'.repeat(80), '\n');

  // https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
  // https://nodejs.org/api/child_process.html#optionsstdio
  const child = spawn('node', [filePath, ...args], {
    stdio: ['pipe', 'pipe', 'pipe', 'ipc'], // [stdin, stdout, stderr, ipc]
  });

  // child process stdin should receive input from master process stdin
  process.stdin.pipe(child.stdin);

  // child process stdout should send data to master process stdout
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);

  child.send({ msg: 'Data from parent (master) process', pid: process.pid });

  child.on('message', (data) => {
    console.log('Message from child:', data.msg, String(data.pid));
    // We only receive one message
    // And here is the end of the initialization
    console.log(
      '-'.repeat(80) + '\n',
      output(
        'cyan',
        '\nPlease click on this terminal window and start typing your input.\n' +
          `If you enter "CLOSE", the script will end.\n`
      )
    );
  });

  child.on('exit', (code) => {
    console.log(`Child process exited with code ${code}`);
    if (code === 0) console.log(output('green', '[Done]\n'));
  });

  child.on('error', (err) => {
    console.error(output('red', '[Error] Child process error:'), err.message);
  });
};

// The arguments in the function are only to test this functionality.
spawnChildProcess(['arg1', 'arg2', 'arg3', 9, true, undefined, null]);
