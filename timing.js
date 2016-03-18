/*function Bomb() {
	this.message = 'Boom!';
}

Bomb.prototype.explode = function() {
	console.log(this.message);
}

var bomb = new Bomb();

var timeoutId = setTimeout(bomb.explode.bind(bomb), 1000);*/

// clearTimeout(timeoutId);

// ---------------------------------------------------------------

// function tick() {
// 	console.log('tick:', Date.now());
// }

// function tock() {
// 	console.log('tock:', Date.now());
// }

// setInterval(tick, 1000);

// setTimeout(function() {
// 	setInterval(tock, 1000)
// }, 500);

// -----------------------------------------------------------------

// function monitor() {
// 	console.log(process.memoryUsage());
// }

// var id = setInterval(monitor, 1000);
// id.unref();

// setTimeout(function() {
// 	console.log('Done!');
// }, 5000);

// -----------------------------------------------------------------

// var EventEmitter = require('events').EventEmitter;

// function complexOperations() {
// 	var events = new EventEmitter();

// 	// events.emit('success'); 1((callout-globals-nexttick-1));
// 	process.nextTick(function(){
// 		events.emit('success');
// 	});

// 	return events;
// }

// complexOperations().on('success', function() {
// 	console.log('success!');
// });

// -----------------------------------------------------------------

var EventEmitter = require('events').EventEmitter;
var fs = require('fs');
var content;

function readFileIfRequired(cb) {
	if (!content) {
		fs.readFile(__filename, 'utf8', function(err, data) {
			content = data;
			console.log('readFileIfRequired: readFile');
			cb(err, content);
		});
	} else {
		process.nextTick(function() {
			console.log('readFileIfRequired: cached');
			cb(null, content);
		});
	}
}

readFileIfRequired(function(err, data) {
	console.log('1. Length:', data.length);

	readFileIfRequired(function(err, data2) {
		console.log('2. Length:', data2.length);
	});

	console.log('Reading file again...');
});

console.log('Reading file...');