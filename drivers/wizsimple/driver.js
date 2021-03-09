"use strict";

const Homey = require('homey');

var devName;
var ipAddr;
var macId;

class WizSimpleDriver extends Homey.Driver {

    async onPair(session) {
		super.onPair(session);
		console.log('Here we are.0...........');
        session.on('pairManually', (data, callback) => {
			console.log('Here we are.1...........');
            if (data.ip === "") return callback(Homey.__("pair.manual.ip_field_empty"), null);
            if (data.name === "") return callback(Homey.__("pair.manual.name_field_empty"), null);
            if (data.mac === "") return callback(Homey.__("pair.manual.mac_field_empty"), null);
			/* create deviceDescriptor */
			var deviceDescriptor = {
				"name": data.name,
				"data": {
					"id": data.mac,
					"ip": data.ip,
				},
				"settings": {
					"name": data.name,
					"id": data.mac,
					"ip": data.ip,
				},
				capabilities: ["onoff", "dim"]
			};
			/* create deviceDescriptor */
			console.log('Here we are.2...........');
			console.log(deviceDescriptor);
			return callback(null, deviceDescriptor);
        });
        // Close the pair session
//        await session.done();
    }
}

module.exports = WizSimpleDriver;