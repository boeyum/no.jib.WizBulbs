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
        this.setCapabilityValue('onoff', isState).catch(this.appError());

        this.pollDevice(id);

        kod = devices.getState(ipAddr);
        this.registerCapabilityListener("onoff", async (value) => {
            this.isState = value;
            const settings = this.getSettings();
            return await devices.setOnOff(settings.ip, value);
        });

        if (isDimming) {
            var dimdata = devices.getDimming(ipAddr);
            this.setCapabilityValue('dim', dimdata).catch(this.appError());
            this.registerCapabilityListener("dim", async (value) => {
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
            this.setCapabilityValue('wiz_kelvin', tempdata).catch(this.appError());
            this.registerCapabilityListener("wiz_kelvin", async (value) => {
                if (value < 2100) {
                    value = 2100;
                } else if (value > 6000) {
                    value = 6000;
                }
                this.hue = RGBHSL.CalculateHue(255, 169, 87);
                this.sat = RGBHSL.CalculateSaturation(255, 169, 87);
                this.setCapabilityValue('light_hue', 29).catch(this.appError());
                this.setCapabilityValue('light_saturation', 100).catch(this.appError());
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
            this.sat = RGBHSL.CalculateSaturation(red, grn, blu);
            if (this.sat < 0) {
                this.sat = 100;
            }
            this.lig = RGBHSL.CalculateLightness(red, grn, blu);
            this.lig = 50;

            this.setCapabilityValue('light_hue', hue).catch(this.appError());
            this.registerCapabilityListener('light_hue', async (value) => {
                this.hue = (360 * value);
                let temp = this.hsl2rgb(this.hue, this.sat, this.lig);
                this.red = temp[0];
                this.grn = temp[1];
                this.blu = temp[2];
                if (this.isState) {
                    const settings = this.getSettings();
                    devices.setColorRGB(settings.ip, this.red, this.grn, this.blu);
                }
            });

            this.setCapabilityValue('light_saturation', sat).catch(this.appError());
            this.registerCapabilityListener('light_saturation', async (value) => {
                this.sat = (value * 100);
                let temp = this.hsl2rgb(this.hue, this.sat, this.lig);
                this.red = temp[0];
                this.grn = temp[1];
                this.blu = temp[2];
                if (this.isState) {
                    const settings = this.getSettings();
                    devices.setColorRGB(settings.ip, this.red, this.grn, this.blu);
                }
            });

       }

        if (isScenes) {
            this.registerCapabilityListener('wiz_colorscene', async (value) => {
                const settings = this.getSettings(ipAddr);
                sce = parseInt(value);
                if (sce == 0) {
                    this.setCapabilityValue('light_hue', 29).catch(this.appError());
                    this.setCapabilityValue('light_saturation', 100).catch(this.error);
                    devices.setLightTemp(settings.ip, 2700);
                } else {
                    devices.onLightScene(settings.ip, sce);
                }
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

    hsl2rgb(h, s, l) {
        s = s / 100; l = l / 100;
        var c, x, m, rgb;
        c = (1 - Math.abs(2 * l - 1)) * s;
        x = c * (1 - Math.abs(((h / 60) % 2) - 1));
        m = l - c / 2; if (h >= 0 && h < 60) rgb = [c, x, 0];
        if (h >= 60 && h < 120) rgb = [x, c, 0];
        if (h >= 120 && h < 180) rgb = [0, c, x];
        if (h >= 180 && h < 240) rgb = [0, x, c];
        if (h >= 240 && h < 300) rgb = [x, 0, c];
        if (h >= 300 && h < 360) rgb = [c, 0, x];
        return rgb.map(v => 255 * (v + m) | 0);
    }

}

module.exports = WizColorDevice;