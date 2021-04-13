'use strict';

const Dgram = require('dgram');

const PORT = 38899;

var success = false;
var devices = [];

class Discover {

	constructor(address, options = {}) {
		var adress = address;
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

	async getIpAndMacAddress(devType, devIds) {
		var data = [];
		var base = true;
		devices = devIds;
		while (base) {
			data = await this.detectMessage('{"method":"registration","params":{"phoneMac":"AAAAAAAAAAAA","register":false,"phoneIp":"1.2.3.4","id":"1"}}');
			for (var ix = 0; ix < data.length; ix++) {
				var temp = data[ix].macId;
				if (temp.toString() == "dummy") {
					return null;
				} else {
					if (!this.checkDevice(temp)) {
						var msg = '{"method":"getSystemConfig","params":{}}';
						var ret = await this.sendMessage(msg, data[ix].ipAdr);
						var type = this.checkType(ret);
						if (type == devType) {
							base = false;
							devices = [];
							return data[ix];
						}
					}
				}
			}
			devices = [];
			base = false;
			return null;
        }
	}

	checkDevice(macId) {
		var funnet = false;
		if (devices.length > 0) {
			for (var i = 0; i < devices.length; i++) {
				var nydev = devices[i].toString();
				if (!nydev.localeCompare(macId)) {
					funnet = true;
                }
            }
		}
		return funnet;
    }

	detectMessage(message) {
		return new Promise(function (resolve, reject) {
			var dev = [];
			var funnet = false;
			var retur = false;
			const socket = Dgram.createSocket({ "reuseAddr": true, "type": "udp4" });

			socket.bind(PORT, undefined, function () {
				socket.setBroadcast(true);
			});

			socket.send(message, 0, message.length, PORT, "255.255.255.255", function (err, bytes) {
				if (err) {
					socket.close();
				}
			});

			socket.on('message', function (msgtmp, rinfo) {
				var msg = msgtmp.toString('utf8');
				var index = msg.indexOf("\\");
				while (index >= 0) {
					msg = msg.replace("\\", "");
					index = msg.indexOf("\\");
				}
				var JSonObj = JSON.parse(msg);
				var JObj = JSonObj.result;
				if (JObj != null) {
					funnet = JObj.success;
                }
				if (funnet) {
					var device = {
						macId: JObj.mac,
						ipAdr: rinfo.address,
						bport: rinfo.port
					};
					retur = true;
					funnet = false;
					dev.push(device);
                }
			});

			socket.on('listening', function () {
				// Get and print udp server listening ip address and port number in log console. 
				var address = socket.address();
//				console.log('UDP Server started and listening on ' + address.address + ":" + address.port);
			});

			let wait = setTimeout(() => {
				if (retur) {
					resolve(dev);
				} else {
					var dummy = {
						macId: "dummy",
						ipAdr: "0.0.0.0",
						bport: PORT
					};
					resolve(dummy);
                }
			}, 2000);

		});
	}

	sendMessage(message, adr) {
		return new Promise(function (resolve, reject) {
			const client = Dgram.createSocket('udp4');

			client.on('message', function (msg, info) {
				client.close();
				var devName = null;
				var tmsg = msg.toString('utf8');
				var index = tmsg.indexOf("\\");
				while (index >= 0) {
					tmsg = tmsg.replace("\\", "");
					index = tmsg.indexOf("\\");
				}
				var JSonObj = JSON.parse(tmsg);
				var JObj = JSonObj.result;
				devName = JObj.moduleName;
				resolve(devName);
			});

			client.send(message, 0, message.length, PORT, adr, function (err, bytes) {
				if (err) {
					client.close();
					resolve(null);
				}
			});
		});
	}

	checkType(modName) {
		var pos1 = modName.toString().indexOf("RGB");
		if (pos1 > 0) {
			return 3;
		}
		var pos2 = modName.toString().indexOf("TW");
		if (pos2 > 0) {
			return 2;
		}
		var pos3 = modName.toString().indexOf("ESP");
		if (pos3 => 0) {
			return 1;
		}
		return 0;
	}
}

module.exports = Discover;
