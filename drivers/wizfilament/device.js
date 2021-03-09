'use strict';

const Homey = require('homey');
const Command = require('../../lib/Command');

var id = null;
var ipAddr = null;
var devices = null;
var isState = false;
var isDimming = false;
var isTemp = false;
var isScenes = false;

var sce = 0;
var dme = 0;
var kod = 0;

class WizFilamentDevice extends Homey.Device {
	
	// this method is called when the Device is inited
	onInit() {
        let id = this.getData().id;
        let ipAddr = this.getData().ip;
        let devices = new Command(ipAddr, null);
 
        var func = devices.getFunctions();
        let isState = devices.getState();
        let isDimming = true;
        let isTemp = true;
        let isScenes = true;
        this.setCapabilityValue('onoff', isState).catch(this.error);

        this.pollDevice(id,devices);

        kod = devices.getState();
        this.registerCapabilityListener("onoff", async (value) => {
            kod = value;
			return await devices.setOnOff(value);
		});

        if (isDimming) {
            var dimdata = devices.getDimming();
            this.setCapabilityValue('dim', dimdata).catch(this.error);
            this.registerCapabilityListener("dim", async (value) => {
                dme = dim;
                devices.setBrightness(value);
			});
		}

        if (isTemp) {
            var tempdata = devices.getTemperature();
            this.setCapabilityValue('wiz_scene', tempdata).catch(this.error);
            this.registerCapabilityListener("wiz_kelvin", async (value) => {
                devices.setLightTemp(value);
			});
		}

        if (isScenes) {
            this.registerCapabilityListener("wiz_scene", async (value) => {
                sce = parseInt(value);
                if (sce == 0) {
                    sce = 0;
                    devices.onLightScene(0);
                    devices.setLightTemp(2700);
                } else {
                    devices.onLightScene(sce);
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
        clearInterval(this.pingInterval);

        this.pollingInterval = setInterval(async () => {
            try {

//                var func = devices.getFunctions();

            } catch (error) {
                this.log(error);
            }
        }, 100000);
    }
}

module.exports = WizFilamentDevice;