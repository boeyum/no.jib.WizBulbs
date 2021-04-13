'use strict';

const Homey = require('homey');
const RGBHSL = require('../../lib/colorconv.js');
const Command = require('../../lib/Command.js');

var id = null;
var ipAddr = null;
var devices = null;
var isState = false;
var isDimming = true;
var isTemp = true;
var isColor = true;
var isScenes = true;
var sce = 0;
var red = 255;
var grn = 255;
var blu = 255;
var hue = 60;
var sat = 100;
var lig = 100;
var kod = 0;

class WizColorDevice extends Homey.Device {

    // this method is called when the Device is inited
    onInit() {
        id = this.getData().id;
        const settings = this.getSettings();
        ipAddr = settings.ip;
        devices = new Command(ipAddr, null);

        isState = devices.getState(ipAddr);
        isDimming = true;
        isTemp = true;
        isColor = true;
        isScenes = true;
        this.setCapabilityValue('onoff', isState);

        this.pollDevice(id);

        kod = devices.getState(ipAddr);
        this.registerCapabilityListener('onoff', async (value) => {
            this.isState = value;
            const settings = this.getSettings();
            return await devices.setOnOff(settings.ip, value);
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

        if (isColor) {
            var rbgdata = devices.getRGB(ipAddr);
            this.red = rbgdata[0];
            this.grn = rbgdata[1];
            this.blu = rbgdata[2];
            this.hue = RGBHSL.CalculateHue(red, grn, blu);
            if (this.hue < 0) {
                this.hue = 0;
            }
            if (this.hue > 360) {
                this.hue = 360;
            }
            this.sat = RGBHSL.CalculateSaturation(red, grn, blu);
            if (this.sat < 0) {
                this.sat = 0;
            }
            if (this.sat > 100) {
                this.sat = 100;
            }
            this.lig = RGBHSL.CalculateLightness(red, grn, blu);
            if (this.lig < 0) {
                this.lig = 0;
            }
            if (this.lig > 100) {
                this.lig = 100;
            }

            this.registerMultipleCapabilityListener(['light_hue', 'light_saturation'], async (capabilityValues, capabilityOptions) => {
                this.hue = (capabilityValues.light_hue * 360);
                this.sat = capabilityValues.light_saturation;
                this.lig = 0.5;
                var temp = RGBHSL.hsl2rgb(this.hue, this.sat, this.lig);
                this.red = temp[0];
                this.grn = temp[1];
                this.blu = temp[2];
                if (this.isState) {
                    const settings = this.getSettings();
                    devices.setColorRGB(settings.ip, this.red, this.grn, this.blu);
                }
           }, 500);

       }

        if (isScenes) {
            this.registerCapabilityListener('wiz_colorscene', async (value) => {
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

module.exports = WizColorDevice;