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
        const settings = this.getSettings();
        ipAddr = settings.ip;
        devices = new Command(ipAddr, null);

        isState = devices.getState(ipAddr);
        isDimming = true;
        isTemp = true;
        isScenes = true;
        this.setCapabilityValue('onoff', isState);

        this.pollDevice(id,devices);

        kod = isState;

        this.registerCapabilityListener('onoff', async (value) => {
            kod = value;
            const settings = this.getSettings();
            return devices.setOnOff(settings.ip, value);
		});

        if (isDimming) {
            var dimdata = devices.getDimming(ipAddr);
            this.setCapabilityValue('dim', dimdata);
            this.registerCapabilityListener('dim', async (value) => {
                if (value < 0) {
                    value = 0;
                } else if (value > 100) {
                    value = 100;
                }
                const settings = this.getSettings();
                devices.setBrightness(settings.ip, value);
			});
		}

        if (isTemp) {
            var tempdata = devices.getTemperature(ipAddr);
            this.setCapabilityValue('wiz_kelvin', tempdata);
            this.registerCapabilityListener('wiz_kelvin', async (value) => {
                if (value < 2100) {
                    value = 2100;
                } else if (value > 6000) {
                    value = 6000;
                }
                const settings = this.getSettings();
                devices.setLightTemp(settings.ip, value);
			});
		}

        if (isScenes) {
            this.registerCapabilityListener('wiz_scene', async (value) => {
                const settings = this.getSettings(ipAddr);
                sce = parseInt(value);
                if (sce == 0) {
                    sce = 0;
                    devices.setLightTemp(settings.ip, 2700);
                } else {
                    devices.onLightScene(settings.ip, sce);
                }
            });
        }
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
                    this.log("Device checked!")
                }
            } catch (error) {
                this.log(error);
            }
        }, 600000);
    }
}

module.exports = WizFilamentDevice;