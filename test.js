var assert = require('assert');
var CountStream = require('./countstream');
var countStream = new CountStream('example');
var fs = require('fs');
var passed = 0;
// example
countStream.on('total', function(count) {
	assert.equal(count, 2);
	passed++;
});

fs.createReadStream(__filename).pipe(countStream);

process.on('exit', function() {
	console.log('Assertions passed:', passed);
})