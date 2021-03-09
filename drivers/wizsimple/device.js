'use strict';

const Homey = require('homey');
const Command = require('../../lib/Command.js');

const id = null;
const ipAddr = null;
const devices = null;
var isState = false;
var isDimming = false;
var isTemp = false;
var isColor = false;
var isScenes = false;

class WizSimpleDevice extends Homey.Device {
	
	// this method is called when the Device is inited
	onInit() {
        let id = this.getData().id;
        let ipAddr = this.getData().ip;
        let devices = new Command(ipAddr,null);

        var func = devices.getFunctions();
        let isState = devices.getState();
        let isDimming = true;
        let isTemp = true;
        let isColor = false;
        let isScenes = false;
        this.setCapabilityValue('onoff', isState).catch(this.error);

        this.pollDevice(id);

        var kode = devices.getState();
        this.registerCapabilityListener("onoff", async (value) => {
			return await devices.setOnOff(value);
		});

        if (isDimming) {
			this.registerCapabilityListener("dim", async (value) => {
                device.setBrightness(value);
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

                var func = devices.getFunctions();

            } catch (error) {
                this.log(error);
            }
        }, 10000);
    }

}

module.exports = WizSimpleDevice;