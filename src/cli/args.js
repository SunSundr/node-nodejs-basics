import { output } from './../output.js';

const parseArgs = () => {
  const args = process.argv.slice(2);
  const argsResult = [];

  for (let i = 0; i < args.length; i += 2) {
    const propName = args[i].replace('--', '');
    const value = args[i + 1];
    argsResult.push(`${propName} is ${value}`);
  }

  if (argsResult.length) {
    console.log(output('green', `[Done] Command line arguments:`));
    console.log(output('cyan', argsResult.join(', ')), '\n');
  } else {
    console.error(output('red', `[Error] There are no command line arguments`));
  }
};

parseArgs();
