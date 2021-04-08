'use strict';

const Homey = require('homey');
const Command = require('../../lib/Command');
const dofind = require('../../lib/Discover');

var id = null;
var ipAddr = null;
var devices = null;
var isState = false;
var isDimming = true;
var isTemp = true;
var isScenes = true;

var sce = 0;
var dme = 0;
var kod = 0;

class WizFilamentDevice extends Homey.Device {
	
	// this method is called when the Device is inited
	onInit() {
        id = this.getData().id;
        ipAddr = this.getData().ip;
        console.log("INSTALL: " + id + " + " + ipAddr);
        devices = new Command(ipAddr, null);
        console.log("ETTER: " + id + " + " + ipAddr);

        var func = devices.getFunctions(ipAddr);
        isState = devices.getState();
        isDimming = true;
        isTemp = true;
        isScenes = true;
        this.setCapabilityValue('onoff', isState).catch(this.error);

        this.pollDevice(id,devices);

        kod = devices.getState();
        this.registerCapabilityListener('onoff', async (value) => {
            kod = value;
            return await devices.setOnOff(ipAddr, value);
		});

        if (isDimming) {
            var dimdata = devices.getDimming();
            this.setCapabilityValue('dim', dimdata).catch(this.error);
            this.registerCapabilityListener('dim', async (value) => {
                dme = value;
                devices.setBrightness(ipAddr, value);
			});
		}

        if (isTemp) {
            var tempdata = devices.getTemperature();
            this.setCapabilityValue('wiz_kelvin', tempdata).catch(this.error);
            this.registerCapabilityListener('wiz_kelvin', async (value) => {
                devices.setLightTemp(ipAddr, value);
			});
		}

        if (isScenes) {
            this.registerCapabilityListener('wiz_scene', async (value) => {
                sce = parseInt(value);
                if (sce == 0) {
                    sce = 0;
                    devices.onLightScene(ipAddr, 0);
                    devices.setLightTemp(ipAddr, 2700);
                } else {
                    devices.onLightScene(ipAddr, sce);
                }
            });
        }
	}

    onAdded() {
        console.log("ADDED ID: " + this.getData().id);
        console.log("ADDED IP: " + this.getData().ip);
    }

    onDeleted() {
        clearInterval(this.pollingInterval);
    }

    // HELPER FUNCTIONS
    pollDevice(id, device) {
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

module.exports = WizFilamentDevice;