var stream = require('stream');
var util = require('util');

util.inherits(MemoryStream, stream.Readable);
util.inherits(OutputStream, stream.Writable);

function MemoryStream() {
    this.isTTY = process.stdout.isTTY;
    stream.Readable.call(this);
}

MemoryStream.prototype._read = function() {
    var text = JSON.stringify(process.memoryUsage()) + '\n';
    if (this.isTTY) {
        this.push('\u001b[32m' + text + '\u001b[39m');
    } else {
        this.push(text);
    }
};

function OutputStream() {
    stream.Writable.call(this);
    this.on('pipe', function(dest) {
        dest.isTTY = this.isTTY;
    }.bind(this));
}

OutputStream.prototype._write = function(chunk, encoding, cb) {
    util.print.(chunk.toString());
};

var memoryStream = new MemoryStream();

memoryStream.pipe(process.stdout);
