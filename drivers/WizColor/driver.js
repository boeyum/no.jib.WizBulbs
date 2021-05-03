"use strict";

const Homey = require('homey');
const Discover = require('../../lib/Discover.js');

class WizColorDriver extends Homey.Driver {

	async onPairListDevices() {
		var devName = "WizColor";
		var devs = [];
		var devId = [];
		let devices = [];
		devices = this.getDevices();
		var funnet = false;
		if (devices.length > 0) {
			for (var i = 0; i < devices.length; i++) {
				devId.push(devices[i].getData().id);
			}
		}

		var discover = new Discover();
		var obj = await discover.getIpAndMacAddress(3, devId);
		if (obj != null) {
			var macadr = obj.macId;
			var ipadr = obj.ipAdr;
			var deviceDescriptor = {
				"name": devName,
				"data": {
					"name": devName,
					"id": macadr,
				},
				"settings": {
					"ip": ipadr
				},
				capabilities: ["onoff", "dim", "wiz_kelvin", "light_hue", "light_saturation", "wiz_colorscene"]
			};
			obj = null;
			devs.push(deviceDescriptor);
			return devs;
		} 
		return [];
	}
}

module.exports = WizColorDriver;