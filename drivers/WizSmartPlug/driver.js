"use strict";

const Homey = require('homey');
const Discover = require('../../lib/Discover.js');

var discover = null;

class WizSmartPlugDriver extends Homey.Driver {

	async onPairListDevices() {
		var devName = "WizSmartPlug";
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

		discover = new Discover();
		var obj = await discover.getIpAndMacAddress(5, devId);
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
				capabilities: ["onoff"]
			};
			obj = null;
			devs.push(deviceDescriptor);
			return devs;
		} 
		return [];
	}
}

module.exports = WizSmartPlugDriver;