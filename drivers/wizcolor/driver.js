"use strict";

const Homey = require('homey');
const Discover = require('../../lib/Discover.js');

var discover = null;
var devName = "WizColor";
var devId = [];

class WizColorDriver extends Homey.Driver {

	async onPairListDevices() {
		let devices = [];
		devices = this.getDevices();
		var funnet = false;
		if (devices.length > 0) {
			for (var i = 0; i < devices.length; i++) {
				devId.push(devices[i].getStoreValue("id"));
			}
		}

		discover = new Discover();
		var obj = await discover.getIpAndMacAddress(3, devId);
		if (obj != null) {
			var deviceDescriptor = {
				"name": devName,
				"data": {
					"id": obj.macId,
					"ip": obj.ipAdr,
				},
				"store": {
					"name": devName,
					"id": obj.macId,
					"ip": obj.ipAdr,
				},
				"settings": {
					"name": devName,
					"id": obj.macId,
					"ip": obj.ipAdr,
				},
				capabilities: ["onoff", "dim", "wiz_kelvin", "light_hue", "light_saturation", "wiz_colorscene"]
			};
			return deviceDescriptor;
		} 
		return devices;
	}
}

module.exports = WizColorDriver;