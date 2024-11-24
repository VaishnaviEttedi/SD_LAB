const path = require('path'); 
const filePath = '/path/to/some/file.txt'; 
console.log('File Name:', path.basename(filePath)); 
console.log('Directory Name:', path.dirname(filePath)); 
console.log('File Extension:', path.extname(filePath));