'use strict';

const Dgram = require('dgram');
const util = require('util');

const PORT = 38899;

const MAC = 0;
const ONOFF = 1;
const DIM = 2;
const TEMP = 3;
const SCENE = 4;
const RGB = 5;
const SPEED = 6;

var adress = null;
var success = false;

class Command {

	constructor(address, options = {}) {
		adress = address;
//		console.log(adress);
	}

	isSuccess() {
		return success;
	}

	getStart(address) {
		return this.getState();
	}

	getMacAdr(address) {
		success = false;
		var msg = '{"method":"getPilot","params":{}}';
		return this.getMessage(msg, address, MAC);
	}

	getState(address) {
		success = false;
		var msg = '{"method":"getPilot","params":{}}';
		return this.getMessage(msg, address, ONOFF);
	}

	getDimming(address) {
		success = false;
		var msg = '{"method":"getPilot","params":{}}';
		return this.getMessage(msg, address, DIM);
	}

	getTemperature(address) {
		success = false;
		var msg = '{"method":"getPilot","params":{}}';
		return this.getMessage(msg, address, TEMP);
	}

	getRGB(address) {
		success = false;
		var msg = '{"method":"getPilot","params":{}}';
		return this.getMessage(msg, address, RGB);
	}

	getScene(address) {
		success = false;
		var msg = '{"method":"getPilot","params":{}}';
		return this.getMessage(msg, address, SCENE);
	}

	getSpeed(address) {
		success = false;
		var msg = '{"method":"getPilot","params":{}}';
		return this.getMessage(msg, address, SPEED);
	}

	setOnOff(address, value) {
		success = false;
		if(value) {
			var msg = '{"method":"setPilot","params":{"state":true}}';
		} else {
			var msg = '{"method":"setPilot","params":{"state":false}}';
		}
		this.sendMessage(msg, address);
	}

	setBrightness(address, level) {
		success = false;
		if (level => 0 && level <= 100) {
			var msg = util.format('{"method":"setPilot","params":{"dimming":%d}}', level);
			this.sendMessage(msg, address);
		}
	}

	setLightTemp(address, level) {
		success = false;
		if (level => 2200 && level <= 6500) {
			var msg = util.format('{"method":"setPilot","params":{"temp":%d}}',level);
			this.sendMessage(msg, address);
		}
	}

	setColorRGB(address, red,green,blue) {
		adress = address;
		success = false;
		if (red => 0 && red <= 255) {
			if (green => 0 && green <= 255) {
				if (blue => 0 && blue <= 255) {
					var msg = util.format('{"method":"setPilot","params":{"r":%d,"g":%d,"b":%d}}', Math.round(red), Math.round(green), Math.round(blue));
					this.sendMessage(msg, address);
				}
			}
		}
	}

	onLightScene(address, scene) {
		success = false;
		if (scene => 1 && scene <= 32) {
			if (speed => 0 && speed <= 100) {
				var msg = util.format('{"method":"setPilot","params":{"sceneId":%d}}', scene);
				this.sendMessage(msg, address);
			}
		} else if (scenes == 1000) {
			if (speed => 0 && speed <= 100) {
				var msg = '{"method":"setPilot","params":{"sceneId":1000}}';
				this.sendMessage(msg, address);
			}
		}
	}

	onLightSpeed(address, speed) {
		success = false;
		var msg = util.format('{"method":"setPilot","params":{"speed":%d}}', speed);
		this.sendMessage(msg, address);
	}

	sendMessage(message, adr) {
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

	getMessage(message, adr, retcode) {
		return new Promise(function (resolve, reject) {
			const client = Dgram.createSocket('udp4');

			client.on('message', function (msg, info) {
				var data;
				client.close();
				success = true;
				var JSonObj = JSON.stringify(msg.toString('utf8'));
				if (retcode == MAC) {
					if (JSonObj.hasOwnProperty('mac')) {
						data = JSonObj.mac;
					} else {
						data = null;
					}
				} else if (retcode == ONOFF) {
					if (JSonObj.hasOwnProperty('state')) {
						data = JSonObj.state;
					} else {
						data = false;
					}
				} else if (retcode == DIM) {
					if (JSonObj.hasOwnProperty('dimming')) {
						data = JSonObj.dimming;
					} else {
						data = 100;
					}
				} else if (retcode == TEMP) {
					if (JSonObj.hasOwnProperty('temp')) {
						data = JSonObj.temp;
					} else {
						data = 2700;
					}
				} else if (retcode == RGB) {
					if (JSonObj.hasOwnProperty('r')) {
						var red = JSonObj.r;
						var green = JSonObj.g;
						var blue = JSonObj.b;
						data = [red, green, blue];
					} else {
						data = [255, 255, 255];
					}
				} else if (retcode == SCENE) {
					if (JSonObj.hasOwnProperty('sceneId')) {
						data = JSonObj.sceneId;
					} else {
						data = 0;
					}
				} else if (retcode == COLD) {
					if (JSonObj.hasOwnProperty('c')) {
						data = JSonObj.c;
					} else {
						data = 0;
					}
				} else if (retcode == WARM) {
					if (JSonObj.hasOwnProperty('w')) {
						data = JSonObj.w;
					} else {
						data = 0;
					}
				} else if (retcode == SPEED) {
					if (JSonObj.hasOwnProperty('speed')) {
						data = JSonObj.speed;
					} else {
						data = 0;
					}
				}
				resolve(data);
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
