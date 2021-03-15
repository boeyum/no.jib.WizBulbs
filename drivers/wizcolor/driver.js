"use strict";

const Homey = require('homey');
const Command = require('../../lib/Command.js');

var devName;
var ipAddr;
var macId;

class WizColorDriver extends Homey.Driver {

	async onPairListDevices() {
		let devices = [];
		await discovery.scan(3000).then(result => {
			for (let i in result) {
				discover = new Discover();
				var obj = discover.getMacAddress();
				for (var x = 0; x < obj.length; x++) {
					if (obj[x].macId == result[i].id) {
						if (obj[x].ipAdr != result[i].ip) {
							ipAddr = obj[x].ipAdr;
						} else {
							ipAddr = resuly[i].ip;
						}
						devices.push({
							"name": result[i].name,
							"data": {
								"id": result[i].mac,
								"ip": ipAddr,
							},
							"store": {
								"name": result[i].name,
								"id": result[i].mac,
								"ip": result[i].ip,
							},
							"settings": {
								"name": result[i].name,
								"id": result[i].mac,
								"ip": ipAddr,
							},
							capabilities: ["onoff", "dim", "wiz_kelvin", "light_hue", "light_saturation", "wiz_colorscene"]
						});
					}
				}
			}
		})
			.catch((err) => {
				return reject(err);
			});

		return devices;
	}

	async onPair(session) {
		super.onPair(session);
		session.on('pairManually', (data, callback) => {
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
				"store": {
					"name": data.name,
					"id": data.mac,
					"ip": data.ip,
				},
				"settings": {
					"name": data.name,
					"id": data.mac,
					"ip": data.ip,
				},
				capabilities: ["onoff", "dim", "wiz_kelvin", "light_hue", "light_saturation", "wiz_colorscene"]
			};
			/* create deviceDescriptor */
			return callback(null, deviceDescriptor);
		});
		// Close the pair session
		//        await session.done();
	}
}

module.exports = WizColorDriver;