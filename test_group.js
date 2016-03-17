var group = require('./group');
var path = require('path');

group.one();
group.two();

console.log('__dirname:', __dirname);
console.log('__filename:', __filename);

console.log(path.join(__dirname,'views','view.html'));

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(text) {
	process.stdout.write(text.toUpperCase());
})