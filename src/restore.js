import fs from 'node:fs/promises';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { exec } from 'node:child_process';
import readline from 'node:readline';
import { output } from './output.js';

/**
  This script allows you to return the project to its original state.
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const foldersToClean = [
  path.join(__dirname, 'fs', 'files'),
  path.join(__dirname, 'hash', 'files'),
  path.join(__dirname, 'streams', 'files'),
  path.join(__dirname, 'zip', 'files'),
];

const cleanFolder = async (folder) => {
  const items = await fs.readdir(folder);
  for (const item of items) {
    const fullPath = path.join(folder, item);
    const stats = await fs.stat(fullPath);
    if (stats.isDirectory()) {
      await cleanFolder(fullPath);
    } else {
      try {
        await fs.unlink(fullPath);
        console.log(output('cyan', 'Remove:'), fullPath);
      } catch (err) {
        console.warn(output('yellow', 'Warning:'), `Cannot delete file ${fullPath}. Skipping...`);
      }
    }
  }
};

const checkTarInstalled = () => {
  return new Promise((resolve, reject) => {
    exec('tar --version', (error, _stdout, _stderr) => {
      if (error) {
        reject(new Error('`tar` is not installed. Run `npm install -g tar` and try again'));
      } else {
        resolve();
      }
    });
  });
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (question) => {
  return new Promise((resolve) => rl.question(question, resolve));
};

const restore = async () => {
  console.log(output('green', '*** Return the project to its original state ***\n'));
  console.log(
    output(
      'gray',
      'During the process of testing and launching functions,\n\
the contents of the project change;\n\
some files are renamed, deleted, or their content is modified.\n\
This script allows you to return the project to its original state.'
    )
  );
  console.log('-'.repeat(80));
  const answer = await askQuestion('Do you want to continue? (Yes/no): ');
  const stop = /^(no|n)$/i.test(answer.trim());
  rl.close();
  if (stop) {
    console.log(output('yellow', '[Abort]\n'));
    return;
  }
  try {
    await checkTarInstalled();

    const archivePath = path.join(dirname(__dirname), 'backup.tar.gz');

    try {
      await fs.access(archivePath, fs.constants.F_OK);
    } catch (err) {
      console.error(output('red', 'Error:'), 'Backup archive not found\n');
      return;
    }

    for (const folder of foldersToClean) {
      await cleanFolder(folder);
    }

    const outputFolderPath = path.join(dirname(__dirname), 'src');
    const command = `tar -xzf ${archivePath} -C ${outputFolderPath}`;

    exec(command, (error, _stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }
      console.log(
        output('green', 'Done:'),
        'All deleted files have been restored to their original versions, and temporary files have been deleted\n'
      );
    });
  } catch (err) {
    console.error(output('red', 'Error:'), err.message);
  }
};

await restore();

// create backup:
// --------------------------------------------------------
/*
  const folderPath = path.join(dirname(__dirname), 'backup');
  const outputFilePath = path.join(dirname(__dirname), 'backup.tar.gz');
  const command = `tar -czf ${outputFilePath} -C ${folderPath} .`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`Done: ${outputFilePath}`);
  }); 
*/
