const args = process.argv.slice(2);

console.log(`Total number of arguments is ${args.length}`);
console.log(`Arguments: ${JSON.stringify(args)}`);

const echoInput = (chunk) => {
    const chunkStringified = chunk.toString();
    if (chunkStringified.includes('CLOSE')) process.exit(0);
    process.stdout.write(`Received from master process: ${chunk.toString()}\n`)
};

process.stdin.on('data', echoInput);

// Added only to check IFC-channel:
//------------------------------------------------------------------
console.log('\nChecking the functionality of the IFC-channel:')
console.log('-'.repeat(80));
process.on('message', (data) => {
    console.log('Message from parent (master):', data.msg, data.pid);
    process.send({ msg: 'Data from child process', pid: process.pid });
});