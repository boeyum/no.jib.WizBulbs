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
				"name": obj.macId,
				"data": {
					"id": obj.macId,
					"ip": obj.ipAdr,
				},
				"store": {
					"name": obj.macId,
					"id": obj.macId,
					"ip": obj.ipAdr,
				},
				capabilities: ["onoff", "dim", "wiz_kelvin", "light_hue", "light_saturation", "wiz_colorscene"]
			};
			return deviceDescriptor;
		} 
		return null;
	}
}

module.exports = WizColorDriver;