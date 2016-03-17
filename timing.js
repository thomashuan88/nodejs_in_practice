/*function Bomb() {
	this.message = 'Boom!';
}

Bomb.prototype.explode = function() {
	console.log(this.message);
}

var bomb = new Bomb();

var timeoutId = setTimeout(bomb.explode.bind(bomb), 1000);*/

// clearTimeout(timeoutId);

function tick() {
	console.log('tick:', Date.now());
}

function tock() {
	console.log('tock:', Date.now());
}

setInterval(tick, 1000);

setTimeout(function() {
	setInterval(tock, 1000)
}, 500);