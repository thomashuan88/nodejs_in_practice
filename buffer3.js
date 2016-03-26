var zlib = require('zlib');
var database = [[], [], [], [], [], [], [], []];
var bitmasks = [1, 2, 4, 8, 16, 32, 64, 128];

function store(buf) {
	var db = buf[0];
	var key = buf.readUInt8(1);

	if (buf[2] === 0x78) {
		zlib.inflate(buf.slice(2), function(er, inflatedBuf) {
			if (er) return console.error(er);

			var data = inflatedBuf.toString();

			bitmasks.forEach(function (bitmask, index) {
				if ((db & bitmask) === bitmask) {
					database[index][key] = data;
				}
			});
		});
	}

}

var header = new Buffer(2);

header[0] = 8;
header[1] = 0;

zlib.deflate('my message', function(er, deflateBuf) {
	if (er) return console.error(er);

	var message = Buffer.concat([header, deflateBuf]);
	store(message);

});

process.on('exit', function() {
	console.log(database);
});	
