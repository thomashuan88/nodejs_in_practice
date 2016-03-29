var redis = require('redis');
var client1 = redis.createClient(6379, '192.168.10.10');
var client2 = redis.createClient(6379, '192.168.10.10');

var msg_count = 0;

client1.on('subscribe', function(channel, count) {
	client2.publish('channel', 'hello world.')
});

client1.on('message', function(channel, message) {
	console.log('client1 channel ' + channel + ': ' + message);
	client1.unsubscribe();
	client1.end();
	client2.end();
});

client1.subscribe('channel');