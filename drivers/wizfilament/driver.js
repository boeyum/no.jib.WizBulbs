"use strict";

const Homey = require('homey');
const Discover = require('../../lib/Discover.js');

var discover = null;
var devName = "WizFilament";
var devId = [];

class WizFilamentDriver extends Homey.Driver {

	async onPairListDevices() {
		let devices = [];
		devices = this.getDevices();
		var funnet = false;
		if (devices.length > 0) {
			for (var i = 0; i < devices.length; i++) {
				devId.push(devices[i].getData().id);
			}
		}

		discover = new Discover();
		var obj = await discover.getIpAndMacAddress(2, devId);
		if (obj != null) {
			var devs = [];
			console.log("NY!: " + obj.macId + " - " + obj.ipAdr);
			var deviceDescriptor = {
				'name': devName,
				'data': {
					'name': devName,
					'id': obj.macId,
					'ip': obj.ipAdr,
				},
				capabilities: ["onoff", "dim", "wiz_kelvin", "wiz_scene"]
			};
			obj = null;
			devs.push(deviceDescriptor);
			return devs;
		} 
		return null;
	}
}

module.exports = WizFilamentDriver;