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

