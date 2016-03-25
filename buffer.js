// var user = 'johnny';
// var pass = 'c-bad';
// var authstring = user + ':' + pass;

// var buf = new Buffer(authstring);

// var encoded = buf.toString('base64');
// console.log(encoded);

var fs = require('fs');

var mime = 'image/png';
var encoding = 'base64';
var data = fs. readFileSync('./monkey.png').toString(encoding);
var uri = 'data:' + mime + ';' + encoding + ',' + data;


var data = uri.split(',')[1];

var buf = Buffer(data, 'base64');

fs.writeFileSync('./secondmonkey.png', buf);
