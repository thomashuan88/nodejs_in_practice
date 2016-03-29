var redis = require('redis');
var client = redis.createClient(6379, '192.168.10.10');

client.on('error', function(err) {
	console.error('Error:', err);
});

client.on('monitor', function(timestamp, args) {
	console.log('Time:', timestamp, 'arguments:', args);
});

client.on('ready', function() {
	// start app here
});