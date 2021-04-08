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

class WizColorDevice extends Homey.Device {

    // this method is called when the Device is inited
    onInit() {
        id = this.getData().id;
        ipAddr = this.getData().ip;
        devices = new Command(ipAddr, null);
        ipAddr = this.getStoreValue('ip');

        var func = devices.getFunctions(ipAddr);
        isState = devices.getState();
        isDimming = true;
        isTemp = true;
        isColor = true;
        isScenes = true;
        this.setCapabilityValue('onoff', isState).catch(this.error);

        this.pollDevice(id);

        var kode = devices.getState();
        this.registerCapabilityListener("onoff", async (value) => {
            this.isState = value;
            return await devices.setOnOff(ipAddr, value);
        });

        if (isDimming) {
            var dimdata = devices.getDimming();
            this.setCapabilityValue('dim', dimdata).catch(this.error);
            this.registerCapabilityListener("dim", async (value) => {
                devices.setBrightness(ipAddr, value);
            });
        }

        if (isTemp) {
            var tempdata = devices.getTemperature();
            this.setCapabilityValue('wiz_kelvin', tempdata).catch(this.error);
            this.registerCapabilityListener("wiz_kelvin", async (value) => {
                this.setCapabilityValue('light_hue', 29).catch(this.error);
                this.setCapabilityValue('light_saturation', 100).catch(this.error);
                devices.setLightTemp(ipAddr, value);
            });
        }

        if (isColor) {
            var rbgdata = devices.getRGB();
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

            this.setCapabilityValue('light_hue', hue).catch(this.error);
            this.registerCapabilityListener('light_hue', async (value) => {
                this.hue = (360 * value);
//                console.log("*HUE:" + this.hue);
                let temp = this.hsl2rgb(this.hue, this.sat, this.lig);
                this.red = temp[0];
                this.grn = temp[1];
                this.blu = temp[2];
                if (this.isState) {
                    devices.setColorRGB(ipAddr, this.red, this.grn, this.blu);
                }
            });

            this.setCapabilityValue('light_saturation', sat).catch(this.error);
            this.registerCapabilityListener('light_saturation', async (value) => {
                this.sat = (value * 100);
                let temp = this.hsl2rgb(this.hue, this.sat, this.lig);
                this.red = temp[0];
                this.grn = temp[1];
                this.blu = temp[2];
                if (this.isState) {
                    devices.setColorRGB(ipAddr, this.red, this.grn, this.blu);
                }
            });

       }

        if (isScenes) {
            this.registerCapabilityListener('wiz_colorscene', async (value) => {
                sce = parseInt(value);
                if (sce == 0) {
                    this.setCapabilityValue('light_hue', 29).catch(this.error);
                    this.setCapabilityValue('light_saturation', 100).catch(this.error);
//                    devices.onLightScene(ipAddr, 0);
                    devices.setLightTemp(ipAddr, 2700);
                } else {
                    devices.onLightScene(ipAddr, sce);
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