'use strict';

const Homey = require('homey');
const { Command } = require('WizBulbs');

const devices = {};
const isState = false;
const isDimming = false;
const isTemp = false;
const isColor = false;
const isScenes = false;

module.exports = class WizBulbHomeyDevice extends Homey.Device {
	
	// this method is called when the Device is inited
	onInit() {
		let id = this.getData().id;
		devices[id] = {};
		devices[id].data = this.getData();
		devices[id].light = new Command(this.getSetting('address'), options);

        var func = devices[id].light.getFunctions();
        isState = func[0];
        isDimming = func[1];
        isTemp = func[2];
        isColor = func[3];
        isScenes = func[4];

        this.setAvailable();
        this.pollDevice(id);

		var kode = "{ onoff:false }";
		if (devices[id].light.getStart) {
			kode = "{ onoff:true }";
		}
		this.registerCapabilityListener("onoff", async (value) => {
			let id = this.getData().id;
			return await devices[id].light.setOnOff(value);
		});

        if (isDimming) {
			var value = "{ dim:" + devices[id].light.getBrightness().toString() + " }";
			this.registerCapabilityListener("dim", async (value) => {
				this.api.setBrightnessAsync();
			});
		}

        if (isTemp) {
			var value = "{ light_temperature:" + devices[id].light.getTemp().toString() + " }";
			this.registerCapabilityListener("light_temperature", async (value) => {
				this.api.setTemperatureAsync();
			});
		}

        if (isColor) {
			var value = "{ light_hue:" + devices[id].light.getRed().toString() + "," + devices[id].light.getGreen().toString() + "," + devices[id].light.getBlue().toString() + " }";
				this.registerCapabilityListener("light_hue", async (value) => {
				this.api.setColorAsync();
			});
		}

	}


    onDeleted() {
        clearInterval(this.pollingInterval);
    }

    // HELPER FUNCTIONS
    pollDevice(id) {
        clearInterval(this.pollingInterval);
        clearInterval(this.pingInterval);

        this.pollingInterval = setInterval(async () => {
            try {

                // capability onoff
                const state = devices[id].light.getState();
                if (state != this.getCapabilityValue('onoff')) {
                    this.setCapabilityValue('onoff', state);
                }

                // capability dim
                if (this.hasCapability('dim')) {
                    const brightness = devices[id].light.getDimming();
                    if (brightness != this.getCapabilityValue('dim')) {
                        this.setCapabilityValue('dim', brightness);
                    }
                }

                // capability light_temperature
                if (this.hasCapability('light_temperature')) {
                    let light_temperature = devices[id].light.getTemp());
                    if (light_temperature != this.getCapabilityValue('light_temperature')) {
                        this.setCapabilityValue('light_temperature', light_temperature);
                    }
                }

                // capability light_hue
                if (this.hasCapability('light_hue')) {
                    let result = await devices[id].light.getRBG();
                    let color = tinycolor({ r: result[0], g: result[1], b: result[2] });
                    let hsv = color.toHsv();
                    let hue = Number((hsv.h / 360).toFixed(2));
                    if (hue != this.getCapabilityValue('light_hue')) {
                        this.setCapabilityValue('light_hue', hue);
                    }
                }

            } catch (error) {
                this.log(error);
                this.setUnavailable(this.homey.__('device.unreachable') + ': ' + error);
                this.pingDevice(id);
            }
        }, 10000);
    }

    pingDevice(id) {
        clearInterval(this.pollingInterval);
        clearInterval(this.pingInterval);

        this.pingInterval = setInterval(async () => {
            try {
                devices[id].light = new Command(this.getSetting('address'), options);

                var func = devices[id].light.getFunctions();
                isState = func[0];
                isDimming = func[1];
                isTemp = func[2];
                isColor = func[3];
                isScenes = func[4];

                var kode = "{ onoff:false }";
                if (devices[id].light.getStart) {
                    kode = "{ onoff:true }";
                }
                this.registerCapabilityListener("onoff", async (value) => {
                    let id = this.getData().id;
                    return await devices[id].light.setOnOff(value);
                });

                if (isDimming) {
                    var value = "{ dim:" + devices[id].light.getBrightness().toString() + " }";
                    this.registerCapabilityListener("dim", async (value) => {
                        this.api.setBrightnessAsync();
                    });
                }

                if (isTemp) {
                    var value = "{ light_temperature:" + devices[id].light.getTemp().toString() + " }";
                    this.registerCapabilityListener("light_temperature", async (value) => {
                        this.api.setTemperatureAsync();
                    });
                }

                if (isColor) {
                    let color = tinycolor({ r: result.color.red, g: result.color.green, b: result.color.blue });
                    let hsv = color.toHsv();
                    let hue = Number((hsv.h / 360).toFixed(2));

                    var value = "{ light_hue:" + devices[id].light.getRed().toString() + "," + devices[id].light.getGreen().toString() + "," + devices[id].light.getBlue().toString() + " }";
                    this.registerCapabilityListener("light_hue", async (value) => {
                        this.api.setColorAsync();
                    });
                }
                this.setAvailable();
                this.pollDevice(id);
            } catch (error) {
                if (runningDiscovery == false) {
                    runningDiscovery = true;
                    const discover = await discovery.scan(3000);
                    const magichomes = await this.homey.drivers.getDriver('magichome').getDevices();
                    for (let i in discover) {
                        Object.keys(magichomes).forEach(function (key) {
                            if (this.getData().id == discover[i].id && this.getSetting('address') != discover[i].address) {
                                this.setSettings({ address: discover[i].address, model: discover[i].model });
                                devices[this.getData().id].light = new Control(discover[i].address, options);
                            }
                        });
                    }
                    setTimeout(() => { runningDiscovery = true }, 10000);
                }
            }
        }, 63000);
    }

}

module.exports = WizBulbHomeyDevice;