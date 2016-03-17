var group = require('./group');
var path = require('path');

group.one();
group.two();

console.log('__dirname:', __dirname);
console.log('__filename:', __filename);

console.log(path.join(__dirname,'views','view.html'));

var name = 'alex';
var user = { name: 'alex' };

console.log('Hello');
console.log('hello %s', name);
console.log('Hello:', name);
console.log('Hello:', user);

console.error('Error, bad user: ', user);