var CountStream = require('./countstream');
var countStream = new CountStream('book');
var http = require('http');

http.get('http://it-ebooks.info/', function(res) {
	res.pipe(countStream);
});

countStream.on('total', function(count) {
	console.log('Total matches:', count);
})