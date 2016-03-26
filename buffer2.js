var fs = require('fs');

fs.readFile('./world.dbf', function(er, buf) {
	// console.log(buf[0].toString());
	var FIELD_TYPES = {
		C: 'Character',
		N: 'Numberic'
	};

	var header = {};

	var date = new Date();
	date.setUTCFullYear(1900 + buf[1]);
	date.setUTCMonth(buf[2]);
	date.setUTCDate(buf[3]);
	header.lastUpdated = date.toUTCString();

	header.totalRecords = buf.readUInt32LE(4);

	header.bytesInHeader = buf.readUInt16LE(8);
	header.bytesPerRecord = buf.readUInt16LE(10);

	var fields = [];
	var fieldOffset = 32;
	var filedTerminator = 0x0D;

	while (buf[fieldOffset] != filedTerminator) {
		var fieldBuf = buf.slice(fieldOffset, fieldOffset + 32);

		var field = {};
		field.name = fieldBuf.toString('ascii', 0, 11).replace(/\u0000/g, '');
		field.type = FIELD_TYPES[fieldBuf.toString('ascii', 11, 12)];
		field.length = fieldBuf[16];
		fields.push(field);

		fieldOffset += 32;
	}

	var startingRecordOffset = header.bytesInHeader;
	var records = [];

	for (var i = 0; i < header.totalRecords; i++) {
		var recordOffset = startingRecordOffset + (i * header.bytesPerRecord);

		var record = {};
		record._isDel = buf.readUInt8(recordOffset) == 0x2A;
		recordOffset++;

		for (var j = 0; j < fields.length; j++) {
			var field = fields[j];
			var Type = field.type == 'Numberic' ? Number : String;
			record[field.name] = Type(buf.toString('ascii', recordOffset, recordOffset + field.length).trim());
			recordOffset += field.length;
		}
		records.push(record);
	}	


	console.log({header:header, fields:fields, records: records});
});