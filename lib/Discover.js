'use strict';

const Dgram = require('dgram');
const util = require('util');

const PORT = 38899;

var adress = null;
var success = false;

class Discover {

	constructor(address, options = {}) {
		adress = address;
	}

	isSuccess() {
		return success;
	}

	ValidateIPaddress(ipaddress) {
		if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
			return (true)
		}
		return (false)
	}

	getIpAndMacAddress() {
		var data = this.detectMessage('{"method":"registration","params":{"phoneMac":"AAAAAAAAAAAA","register":false,"phoneIp":"1.2.3.4","id":"1"}}');
		return data;
	}

	detectMessage(message) {
		var devices = [];
		return new Promise(function (resolve, reject) {
			const socket = Dgram.createSocket({ type: "udp4", reuseAddr: true });
			socket.bind(PORT);

			client.send(message, 0, message.length, PORT, "255.255.255.255", function (err, bytes) {
				if (err) {
					client.close();
					resolve(null);
				}
			});

			socket.on("message", function (message, rinfo) {
				var JSonObj = JSON.stringify(message.toString('utf8'));
				var device = {
					macId: JSonObj.mac,
					ipAdr: rinfo.address,
					bport: rinfo.port
				};
				devices.push(device);
			});

			timeoutId = setTimeout(() => {
				resolve(devices);
			}, 3000);

		});
	}

}

module.exports = Discover;
