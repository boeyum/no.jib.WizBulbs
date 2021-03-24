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
var ccol = 0;
var wcol = 0;
var func = [];

class Command {

	constructor(address, options = {}) {
		adress = address;
//		console.log(adress);
	}

	isSuccess() {
		return success;
	}

	getStart() {
		return state;
	}

	getFunctions(address) {
		adress = address;
		// Function order: onoff, dimming, temperature, color, scenery
		success = false;
		var msg = '{"method":"getPilot","params":{}}';
		this.getMessage(msg,adress);
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

	setOnOff(address, value) {
		adress = address;
		success = false;
		if(value) {
			var msg = '{"method":"setPilot","params":{"state":true}}';
		} else {
			var msg = '{"method":"setPilot","params":{"state":false}}';
		}
		this.sendMessage(msg, adress);
	}

	setBrightness(address, level) {
		adress = address;
		success = false;
		if (level => 0 && level <= 100) {
			var msg = util.format('{"method":"setPilot","params":{"dimming":%d}}', level);
			this.sendMessage(msg, adress);
		}
	}

	setLightTemp(address, level) {
		adress = address;
		success = false;
		if (level => 2200 && level <= 6500) {
			var msg = util.format('{"method":"setPilot","params":{"temp":%d}}',level);
			this.sendMessage(msg, adress);
		}
	}

	setColorRGB(address, red,green,blue) {
		adress = address;
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

	onLightScene(address, scene) {
		adress = address;
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

	onLightSpeed(address, speed) {
		adress = address;
		success = false;
		var msg = util.format('{"method":"setPilot","params":{"speed":%d}}', speed);
		this.sendMessage(msg, adress);
	}

	sendMessage(message,adr) {
		return new Promise(function (resolve, reject) {
			const client = Dgram.createSocket('udp4');

			client.on('message', function (msg, info) {
				client.close();
				var JSonObj = JSON.stringify(msg.toString('utf8'));
				if (JSonObj.hasOwnProperty('success')) {
					success = JSonObj.success;
				}
				resolve(msg);
			});

			client.send(message, 0, message.length, PORT, adr, function (err, bytes) {
			if (err) {
					client.close();
					console.log(err);
					reject(null);
				}
			});
		});
	}

	getMessage(message,adr) {
		return new Promise(function (resolve, reject) {
			const client = Dgram.createSocket('udp4');

			client.on('message', function (msg, info) {
				client.close();
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
				if (JSonObj.hasOwnProperty('c')) {
					ccol = JSonObj.c;
				}
				if (JSonObj.hasOwnProperty('w')) {
					wcol = JSonObj.w;
				}
				if (JSonObj.hasOwnProperty('speed')) {
					speed = JSonObj.speed;
				}

				resolve(msg);
			});

			client.send(message, 0, message.length, PORT, adr, function (err, bytes) {
				if (err) {
					client.close();
					success = false;
					console.log(err);
					reject(null);
				}
			});
		});
	}
}

module.exports = Command;
