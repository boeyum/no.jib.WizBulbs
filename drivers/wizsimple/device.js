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
        let id = this.getData().id;
        let ipAddr = this.getData().ip;
        let devices = new Command(ipAddr,null);

        var func = devices.getFunctions(ipAddr);
        let isState = devices.getState();
        let isDimming = true;
        let isTemp = true;
        let isColor = false;
        let isScenes = false;
        this.setCapabilityValue('onoff', isState).catch(this.error);

        this.pollDevice(id);

        var kode = devices.getState();
        this.registerCapabilityListener("onoff", async (value) => {
            return await devices.setOnOff(this.ipAddr, value);
		});

        if (isDimming) {
			this.registerCapabilityListener("dim", async (value) => {
                device.setBrightness(this.ipAddr, value);
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
                    const dFind = new dofind("255.255.255.255");
                    var devs = dFind.getIpAndMacAddress();
                    for (var x = 0; x < devs.length; x++) {
                        if (id.localeCompare(devs.macId)) {
                            ipAddr = devs.ipAdr;
                        }
                    }
                }
            } catch (error) {
                this.log(error);
            }
        }, 600000);
    }

}

module.exports = WizSimpleDevice;