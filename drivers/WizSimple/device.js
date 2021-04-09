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
        this.setCapabilityValue('onoff', isState).catch(this.appError());

        this.pollDevice(id);

        var kod = devices.getState(ipAddr);
        this.registerCapabilityListener("onoff", async (value) => {
            const settings = this.getSettings();
            return await devices.setOnOff(settings.ip, value);
		});

        if (isDimming) {
            var dimdata = devices.getDimming(ipAddr);
            this.setCapabilityValue('dim', dimdata).catch(this.appError());
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

    appError() {
        consol.error("Failed setting capability value.");
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
                console.error(error);
            }
        }, 600000);
    }

}

module.exports = WizSimpleDevice;