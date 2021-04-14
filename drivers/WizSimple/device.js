'use strict';

const Homey = require('homey');
const Command = require('../../lib/Command.js');

const id = null;
const ipAddr = null;
const devices = null;
var isState = false;
var isDimming = true;
var isTemp = false;
var isColor = false;
var isScenes = false;

class WizSimpleDevice extends Homey.Device {
	
	// this method is called when the Device is inited
	onInit() {
        id = this.getData().id;
        const settings = this.getSettings();
        ipAddr = settings.ip;
        devices = new Command(ipAddr,null);

        isState = devices.getState();
        isDimming = true;
        isTemp = true;
        isColor = false;
        isScenes = false;
        this.setCapabilityValue('onoff', isState);

        this.pollDevice(id);

        var kod = devices.getState(ipAddr);
        this.registerCapabilityListener("onoff", async (value) => {
            const settings = this.getSettings();
            return await devices.setOnOff(settings.ip, value);
		});

        if (isDimming) {
            var dimdata = devices.getDimming(ipAddr);
            this.setCapabilityValue('dim', dimdata);
            this.registerCapabilityListener("dim", async (value) => {
                if (value < 0) {
                    value = 0;
                } else if(value > 100) {
                    value = 100;
                }
                const settings = this.getSettings();
                devices.setBrightness(settings.ip, value);
			});
		}
	}

    onDeleted() {
        clearInterval(this.pollingInterval);
    }

    // HELPER FUNCTIONS
    pollDevice(id) {
        clearInterval(this.pollingInterval);

        this.pollingInterval = setInterval(async () => {
            try {
                var funcX = devices.getFunctions();
                var base = funcX[0];
                if (!devices.isSuccess()) {
                    this.log("Device checked!")
                }
            } catch (error) {
                this.log(error);
            }
        }, 600000);
    }

}

module.exports = WizSimpleDevice;