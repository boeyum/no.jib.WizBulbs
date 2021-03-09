'use strict';

const Dgram = require('dgram');
const util = require('util');

const PORT = 38899;

var adress = null;
var success = false;
var state = false;
var mac = null;
var dimming = 50;
var temp = 2700;
var sceneId = 0;
var speed = 0;
var red = 255;
var green = 255;
var blue = 240;
var func = [];

class Command {

	constructor(address, options = {}) {
		adress = address;
		console.log(adress);
	}

	isSuccess() {
		return success;
	}

	getStart() {
		return state;
	}

	getFunctions() {
		// Function order: onoff, dimming, temperature, color, scenery
		var msg = '{"method":"getPilot","params":{}}';
		this.getMessage(msg,adress);
		success = false;
		return func;
    }

	getMacAdr() {
		return mac;
	}

	getState() {
		return state;
	}

	getDimming() {
		return dimming;
	}

	getTemperature() {
		return temp;
	}

	getRGB() {
		return [red, green, blue];
	}

	getScene() {
		return sceneId;
	}

	getSpeed() {
		return speed;
	}

	setOnOff(value) {
		success = false;
		if(value) {
			var msg = '{"method":"setPilot","params":{"state":true}}';
		} else {
			var msg = '{"method":"setPilot","params":{"state":false}}';
		}
		this.sendMessage(msg, adress);
	}

	setBrightness(level) {
		success = false;
		if (level => 0 && level <= 100) {
			var msg = util.format('{"method":"setPilot","params":{"dimming":%d}}', level);
			this.sendMessage(msg, adress);
		}
	}

	setLightTemp(level) {
		success = false;
		if (level => 2200 && level <= 6500) {
			var msg = util.format('{"method":"setPilot","params":{"temp":%d}}',level);
			this.sendMessage(msg, adress);
		}
	}

	setColorRGB(red,green,blue) {
		success = false;
		if (red => 0 && red <= 255) {
			if (green => 0 && green <= 255) {
				if (blue => 0 && blue <= 255) {
					var msg = util.format('{"method":"setPilot","params":{"r":%d,"g":%d,"b":%d}}', Math.round(red), Math.round(green), Math.round(blue));
					this.sendMessage(msg, adress);
				}
			}
		}
	}

	onLightScene(scene) {
		success = false;
		if (scene => 1 && scene <= 32) {
			if (speed => 0 && speed <= 100) {
				var msg = util.format('{"method":"setPilot","params":{"sceneId":%d}}', scene);
				this.sendMessage(msg, adress);
			}
		} else if (scenes == 1000) {
			if (speed => 0 && speed <= 100) {
				var msg = '{"method":"setPilot","params":{"sceneId":1000}}';
				this.sendMessage(msg, adress);
			}
		}
	}

	onLightSpeed(speed) {
		success = false;
		var msg = util.format('{"method":"setPilot","params":{"speed":%d}}', speed);
		this.sendMessage(msg, adress);
	}

	getIpAndMacAddress() {
		var data = sendMessage('{"method":"registration","params":{"phoneMac":"AAAAAAAAAAAA","register":false,"phoneIp":"1.2.3.4","id":"1"}}');
		return data;
	}

	sendMessage(message,adr) {
		return new Promise(function (resolve, reject) {
			const client = Dgram.createSocket('udp4');

			client.on('message', function (msg, info) {
				client.close();
				console.log('Data received from bulb : ' + msg.toString('utf8'));
				console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port);
				var JSonObj = JSON.stringify(msg.toString('utf8'));
				if (JSonObj.hasOwnProperty('success')) {
					success = JSonObj.success;
				}
				resolve(msg);
			});

			client.send(message, 0, message.length, PORT, adr, function (err, bytes) {
				console.log(message);
				console.log('Data sent to bulb : ' + message);
				console.log('Sent to %s port %d\n', adr, PORT);
			if (err) {
					client.close();
					console.log(err);
					resolve(null);
				}
			});
		});
	}

	getMessage(message,adr) {
		return new Promise(function (resolve, reject) {
			const client = Dgram.createSocket('udp4');

			client.on('message', function (msg, info) {
				client.close();
				console.log(msg.toString('utf8'));
				success = true;
				var JSonObj = JSON.stringify(msg.toString('utf8'));
				if (JSonObj.hasOwnProperty('mac')) {
					mac = JSonObj.mac;
				}
				if (JSonObj.hasOwnProperty('state')) {
					state = JSonObj.state;
					func[0] = true;
				} else {
					state = JSonObj.state;
					func[0] = false;
				}
				if (JSonObj.hasOwnProperty('dimming')) {
					dimming = JSonObj.dimming;
					func[1] = true;
				} else {
					func[1] = false;
				}
				if (JSonObj.hasOwnProperty('temp')) {
					temp = JSonObj.temp;
					func[2] = true;
				} else {
					func[2] = false;
				}
				if (JSonObj.hasOwnProperty('r')) {
					red = JSonObj.r;
					green = JSonObj.g;
					blue = JSonObj.b;
					func[3] = true;
				} else {
					func[3] = false;
				}
				if (JSonObj.hasOwnProperty('sceneId')) {
					sceneId = JSonObj.sceneId;
					func[4] = true;
				} else {
					func[4] = false;
				}
				if (JSonObj.hasOwnProperty('speed')) {
					speed = JSonObj.speed;
				}

				resolve(msg);
			});

			client.send(message, 0, message.length, PORT, adr, function (err, bytes) {
				console.log(message);
				if (err) {
					client.close();
					success = false;
					console.log(err);
					resolve(null);
				}
			});
		});
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
				//				console.info(`Message from: ${rinfo.address}:${rinfo.port} - ${message}`);
			});

			timeoutId = setTimeout(() => {
				resolve(devices);
			}, 3000);

		});
	}
}

module.exports = Command;
