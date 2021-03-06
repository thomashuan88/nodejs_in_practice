var util = require('util');
var events = require('events');

var AudioDevice = {
	play: function(track) {
		// stub: trigger playback through itunes, mpg123, etc.
		console.log('Track now playing:', track);
	},
	stop: function() {
		console.log('stop playing')
	}
}

function MusicPlayer() {
	this.playing = false;
	events.EventEmitter.call(this);
}

util.inherits(MusicPlayer, events.EventEmitter);

var musicPlayer = new MusicPlayer();


function play(track) {
	this.playing = true;
	AudioDevice.play(track);
}
musicPlayer.on('play', play);

musicPlayer.once('play', function () {
	this.audioFirstStarted = new Date();
})

musicPlayer.on('stop', function() {
	this.playing = false;
	AudioDevice.stop();
});

musicPlayer.emit('play', 'The Roots - The Fire');


setTimeout(function() {
	musicPlayer.emit('stop');
}, 1000);

console.log(musicPlayer.audioFirstStarted);
