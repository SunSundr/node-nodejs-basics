# Node.js basics

## Description

This project demonstrates the completion of several tasks on Node.js basics.

The project was completed as part of the [RS School](https://rs.school/) [NodeJS 2024 Q3 course](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/nodejs-basics/assignment.md).

The project contains several nested folders inside `src`, with the necessary functionality implemented within them.
The output results are displayed in the terminal, with highlights in color and formatted for easy readability.

During the testing and execution of functions, the content of the project changes; some files are renamed, deleted, or their content is modified. A script has been added to the project to restore it to its original state.

## Technical requirements

- Use 22.x.x version (22.9.0 or upper) of Node.js.
- For convenient function execution, npm-scripts are defined in `package.json` to run each subtask.
- To return the project to its original state, run the `restore.js` script.

## Subtasks

### File system (src/fs)

Implemented several functions in dedicated files:
- `create.js` - Function that creates a new file `fresh.txt` with content `I am fresh and young` inside the `files` folder. If the file already exists, an `Error` with the message `FS operation failed` is thrown.
- `copy.js` - Function that copies the `files` folder with all its content into the `files_copy` folder at the same level. If the `files` folder doesn't exist or `files_copy` has already been created, an `Error` with the message `FS operation failed` is thrown.
- `rename.js` - Function that renames the file `wrongFilename.txt` to `properFilename.md`. If there's no file `wrongFilename.txt` or `properFilename.md` already exists, an `Error` with the message `FS operation failed` is thrown.
- `delete.js` - Function that deletes the file `fileToRemove.txt`. If there's no file `fileToRemove.txt`, an `Error` with the message `FS operation failed` is thrown.
- `list.js` - Function that prints an array of filenames from the `files` folder into the console. If the `files` folder doesn't exist, an `Error` with the message `FS operation failed` is thrown.
- `read.js` - Function that prints the content of the `fileToRead.txt` into the console. If there's no file `fileToRead.txt`, an `Error` with the message `FS operation failed` is thrown.

### Command line interface (src/cli)

Implemented several functions in dedicated files:

- `env.js` - Function that parses environment variables with the prefix `RSS_` and prints them to the console in the format `RSS_name1=value1; RSS_name2=value2`.
- `args.js` - Function that parses command line arguments (given in the format `--propName value --prop2Name value2`) and prints them to the console in the format `propName is value, prop2Name is value2`.

### Modules (src/modules)

Refactored file `cjsToEsm.cjs` and renamed to `esm.mjs`:

- `esm.mjs` - Rewritten to its equivalent of `cjsToEsm.cjs` in ECMAScript notation.

### Hash (src/hash)

Implemented several functions in dedicated files:

- `calcHash.js` - Function that calculates the SHA256 hash for the file `fileToCalculateHashFor.txt` and logs it into the console as `hex` using the Streams API.

### Streams (src/streams)

Implemented several functions in dedicated files:

- `read.js` - Function that reads the content of the file `fileToRead.txt` using a Readable Stream and prints its content into `process.stdout`.
- `write.js` - Function that writes `process.stdin` data into the file `fileToWrite.txt` using a Writable Stream.
- `transform.js` - Function that reads data from `process.stdin`, reverses the text using a Transform Stream, and then writes it into `process.stdout`.

### Zlib (src/zip)

Implemented several functions in dedicated files:

- `compress.js` - Function that compresses the file `fileToCompress.txt` to `archive.gz` using `zlib` and the Streams API.
- `decompress.js` - Function that decompresses `archive.gz` back to `fileToCompress.txt` with the same content as before compression using `zlib` and the Streams API.

### Worker Threads (src/wt)

Implemented several functions in dedicated files:

- `worker.js` - Extended the given function to work with data received from the main thread and implemented a function that sends the result of the computation to the main thread.
- `main.js` - Function that creates a number of worker threads (equal to the number of host machine logical CPU cores) from the file `worker.js` and is able to send data to those threads and receive the result of the computation from them. Incremental numbers starting from `10` are sent to each `worker`. For example, on a host machine with **4** cores, **4** workers are created and `10` is sent to the first `worker`, `11` to the second `worker`, `12` to the third `worker`, and `13` to the fourth `worker`. After all workers finish, the function logs an array of results into the console. The results are an array of objects with 2 properties:
    - `status` - `'resolved'` in case of successfully received value from `worker` or `'error'` in case of error in `worker`.
    - `data` - value from `worker` in case of success or `null` in case of error in the worker.

The results in the array are in the same order that the workers were created.

### Child Processes (src/cp)

Implemented several functions in dedicated files:

- `cp.js` - Function `spawnChildProcess` that receives an array of arguments `args` and creates a child process from the file `script.js`, passing these `args` to it. This function creates an IPC-channel between `stdin` and `stdout` of the master process and the child process:
    - The child process `stdin` receives input from the master process `stdin`.
    - The child process `stdout` sends data to the master process `stdout`.
