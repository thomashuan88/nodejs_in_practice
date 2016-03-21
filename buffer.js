var fs = require('fs');
var uri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAo...';

var data = uri.split(',')[1];
var buf = Buffer(data, 'base64');
fs.writeFileSync('./secondmonkey.png', buf);