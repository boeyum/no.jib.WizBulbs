'use strict';

class Utillities {

    ValidateIPaddress(ipaddress) {
	    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
		    return (true)
	    }
	    return (false)
    }

    kevin2rgb(kelvin) {
        var tempr = kelvin / 100.0;
        var rgb = []; 
        var red, green, blue;

        if (tempr < 66.0) {
            red = 255;
        } else {
            red = tempr - 55.0;
            red = 351.97690566805693 + 0.114206453784165 * red - 40.25366309332127 * Math.log(red);
            if (red < 0) red = 0;
            if (red > 255) red = 255;
        }
        rgb[0] = Math.round(red);
        if (tempr < 66.0) {
            green = tempr - 2;
            green = -155.25485562709179 - 0.44596950469579133 * green + 104.49216199393888 * Math.log(green);
            if (green < 0) green = 0;
            if (green > 255) green = 255;
        } else {
            green = tempr - 50.0;
            green = 325.4494125711974 + 0.07943456536662342 * green - 28.0852963507957 * Math.log(green);
            if (green < 0) green = 0;
            if (green > 255) green = 255;
        }
        rgb[1] = Math.round(green);
        if (tempr >= 66.0) {
            blue = 255;
        } else {
            if (tempr <= 20.0) {
                blue = 0;
            } else {
                blue = tempr - 10;
                blue = -254.76935184120902 + 0.8274096064007395 * blue + 115.67994401066147 * Math.log(blue);
                if (blue < 0) blue = 0;
                if (blue > 255) blue = 255;
            }
        }
        rgb[2] = Math.round(blue);

        return rgb;
    }

    rgb2kelvin(red, green, blue) {
        var tempr, varRGB;
        var evar = 0.4;
        var mintempr = 1000;
        var maxtempr = 40000;
        while (maxtempr - mintempr > evar) {
            tempr = (maxtempr + mintempr) / 2;
            varRGB = colortempr2rgb(tempr);
            if ((varRGB.blue / varRGB.red) >= (blue / red)) {
                maxtempr = tempr;
            } else {
                mintempr = tempr;
            }
        }
        return Math.round(tempr);
    }

    rgb2hsv(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;
        if (max == min) {
            h = s = 0; 
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return [h, s, l];
    }

    hsl2rgb(h, s, l) {
        var r, g, b;
        if (s == 0) {
            r = g = b = l; 
        } else {
            function hue2rgb(p, q, t) {
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
        return [r * 255, g * 255, b * 255];
    }
}

module.exports = Utillities;


