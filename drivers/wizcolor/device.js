'use strict';

const Homey = require('homey');
const util = require('util');
const Command = require('../../lib/Command.js');

var id = null;
var ipAddr = null;
var devices = null;
var isState = false;
var isDimming = false;
var isTemp = false;
var isColor = false;
var isScenes = false;
var hue = 0;
var sat = 0;
var lig = 0;
var sce = 0;
var red = 255;
var grn = 255;
var blu = 240;
var spd = 0;

class WizColorDevice extends Homey.Device {
	
	// this method is called when the Device is inited
	onInit() {
        let id = this.getData().id;
        let ipAddr = this.getData().ip;
        devices = new Command(ipAddr,null);

        var func = devices.getFunctions();
        isState = true;
        isDimming = true;
        isTemp = true;
        isColor = true;
        isScenes = true;

        this.setAvailable();
        this.pollDevice(id);

        var kode = devices.getState();
        this.registerCapabilityListener("onoff", async (value) => {
            console.log("Pushed on/off..........")
            return await devices.setOnOff(value);
        });

        if (isDimming) {
            var dimdata = devices.getDimming();
            this.setCapabilityValue('dim', dimdata).catch(this.error);
            this.registerCapabilityListener("dim", async (value) => {
                lig = value;
                devices.setBrightness(value);
            });
		}

        if (isTemp) {
            var tempdata = devices.getTemperature();
            this.setCapabilityValue('wiz_kelvin', tempdata).catch(this.error);
            this.registerCapabilityListener("wiz_kelvin", async (value) => {
                devices.setLightTemp(value);
            });
		}

        if (isColor) {
            var rbgdata = devices.getRGB();
            red = rbgdata[0];
            grn = rbgdata[1];
            blu = rbgdata[2];




            console.log("Her er init color------");
            console.log(rbgdata);
            var hsl = this.rgb2hsl(rbgdata[0], rbgdata[1], rbgdata[2]);
            hue = hsl[0];
            var t1 = Math.round(hsl[1]);
            sat = (t1 / 100);
            var t2 = Math.round(hsl[2]);
            lig = (t2 / 100);
            console.log(hsl);
            console.log("OK- er init color------");

            this.setCapabilityValue('light_hue', this.hue).catch(this.error);
            this.registerCapabilityListener('light_hue', async (value) => {
                console.log(value);
                this.hue = value;
                this.sendColorMessage(0,value);
            });

            this.setCapabilityValue('light_saturation', this.sat).catch(this.error);
            this.registerCapabilityListener('light_saturation', async (value) => {
                console.log(value);
                this.sat = value;
                this.sendColorMessage(1,value);
            });
        }

        if (isScenes) {
            this.registerCapabilityListener('wiz_colorscene', async (value) => {
                console.log("Pushed scene..........");
                console.log(value);
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
    pollDevice(id) {
        clearInterval(this.pollingInterval);
        clearInterval(this.pingInterval);

        this.pollingInterval = setInterval(async () => {
            try {

//                var func = devices.getFunctions();
 
            } catch (error) {
                this.log(error);
            }
        }, 600000);
    }

    sendColorMessage(funk, value) {
        if (funk == 0) {
            hue = value;
            lig = devices.getDimming();
        }
        if (funk == 1) {
            sat = value;
            lig = devices.getDimming();
        }
        var rgbsend = this.hslToRgb(hue, sat, lig);
        red = rgbsend[0];
        grn = rgbsend[1];
        blu = rgbsend[2];
        devices.onLightScene(0);
        devices.setColorRGB(red, grn, blu);
    }

    hslToRgb(h, s, l) {
        var r, g, b;

        if (s == 0) {
            r = g = b = l; // achromatic
        } else {
            var hue2rgb = function hue2rgb(p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    }

}


module.exports = WizColorDevice;