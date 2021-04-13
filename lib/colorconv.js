exports.CalculateLightness = function (R, G, B) {
	let Max = 0.0
	let Min = 0.0

	let fR = R / 255.0;
	let fG = G / 255.0;
	let fB = B / 255.0;

	if (fR >= fG && fR >= fB)
		Max = fR;
	else if (fG >= fB && fG >= fR)
		Max = fG;
	else if (fB >= fG && fB >= fR)
		Max = fB;

	if (fR <= fG && fR <= fB)
		Min = fR;
	else if (fG <= fB && fG <= fR)
		Min = fG;
	else if (fB <= fG && fB <= fR)
		Min = fB;

	let Lightness = (Min + Max) / 2.0;

	return Lightness;
}


exports.CalculateSaturation = function (R, G, B) {
	let Max = 0.0;
	let Min = 0.0;

	let fR = R / 255.0;
	let fG = G / 255.0;
	let fB = B / 255.0;

	if (fR >= fG && fR >= fB)
		Max = fR;
	else if (fG >= fB && fG >= fR)
		Max = fG;
	else if (fB >= fG && fB >= fR)
		Max = fB;

	if (fR <= fG && fR <= fB)
		Min = fR;
	else if (fG <= fB && fG <= fR)
		Min = fG;
	else if (fB <= fG && fB <= fR)
		Min = fB;

	let Lightness = exports.CalculateLightness(R, G, B);

	let Saturation;

	if (Max == Min) {
		Saturation = -1.0;
	}
	else {
		if (Lightness < 0.5) {
			Saturation = (Max - Min) / (Max + Min);
		}
		else {
			Saturation = (Max - Min) / (2.0 - Max - Min);
		}
	}

	return Saturation;
}


exports.CalculateHue = function (R, G, B) {
	let Max = 0.0;
	let Min = 0.0;

	let fR = R / 255.0;
	let fG = G / 255.0;
	let fB = B / 255.0;

	if (fR >= fG && fR >= fB)
		Max = fR;
	else if (fG >= fB && fG >= fR)
		Max = fG;
	else if (fB >= fG && fB >= fR)
		Max = fB;

	if (fR <= fG && fR <= fB)
		Min = fR;
	else if (fG <= fB && fG <= fR)
		Min = fG;
	else if (fB <= fG && fB <= fR)
		Min = fB;

	let Hue;

	if (Max == Min) {
		Hue = -1.0;
	}
	else {
		if (Max == fR) {
			Hue = (fG - fB) / (Max - Min);
		}
		else if (Max == fG) {
			Hue = 2.0 + (fB - fR) / (Max - Min);
		}
		else if (Max == fB) {
			Hue = 4.0 + (fR - fG) / (Max - Min);
		}

		Hue *= 60.0;

		if (Hue < 0.0) {
			Hue += 360.0;
		}
	}

	return Hue;
}

exports.hsl2rgb = function (hue, saturation, lightness) {
	if (hue == undefined) {
		return [0, 0, 0];
	}

	var chroma = (1 - Math.abs((2 * lightness) - 1)) * saturation;
	var huePrime = hue / 60;
	var secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1));

	huePrime = Math.floor(huePrime);
	var red;
	var green;
	var blue;

	if (huePrime === 0) {
		red = chroma;
		green = secondComponent;
		blue = 0;
	} else if (huePrime === 1) {
		red = secondComponent;
		green = chroma;
		blue = 0;
	} else if (huePrime === 2) {
		red = 0;
		green = chroma;
		blue = secondComponent;
	} else if (huePrime === 3) {
		red = 0;
		green = secondComponent;
		blue = chroma;
	} else if (huePrime === 4) {
		red = secondComponent;
		green = 0;
		blue = chroma;
	} else if (huePrime === 5) {
		red = chroma;
		green = 0;
		blue = secondComponent;
	}

	var lightnessAdjustment = lightness - (chroma / 2);
	red += lightnessAdjustment;
	green += lightnessAdjustment;
	blue += lightnessAdjustment;

	return [
		Math.abs(Math.round(red * 255)),
		Math.abs(Math.round(green * 255)),
		Math.abs(Math.round(blue * 255))
	];
};

