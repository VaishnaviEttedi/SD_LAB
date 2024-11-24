const os = require('os'); 
console.log('OS Platform:', os.platform()); 
console.log('OS Architecture:', os.arch()); 
console.log('Total Memory (in bytes):', os.totalmem()); 
console.log('Free Memory (in bytes):', os.freemem());