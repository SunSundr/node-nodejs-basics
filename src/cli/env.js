import { output } from './../output.js';

const envPrefix = 'RSS_';

const parseEnv = () => {
    // slow version:
    // const rssVariables = Object.keys(process.env)
    //     .filter(key => key.startsWith(envPrefix))
    //     .map(key => `${key}=${process.env[key]}`);
    
    const rssVariables = [];
    for (const key in process.env) {
        if (key.startsWith(envPrefix)) rssVariables.push(`${key}=${process.env[key]}`);
    }

    if (rssVariables.length) {
        console.log(output('green', `[Done] Environment variables with '${envPrefix}' prefix:`));
        console.log(output('cyan', rssVariables.join('; ')), '\n');
    } else {
        console.error(output('red', `[Error] There are no environment variables with the "${envPrefix}" prefix`));
    }
};

parseEnv();