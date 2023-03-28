export class Impl1 {
    constructor() {
        this.fps = 20;
    }


    init(ca, colors) {
        ca.setColor(colors, 1, 100);
    }
    update(ca, colors, newColors, i) {

        let color = ca.getColor(colors, i);
        let neighbor = ca.getNeigborCount(colors, i);

        //console.log('col',ca.faceCount, i, color);
        // get the color value, divide by 4
        let newColor = color / 10 * 7;

        ca.getNeigbors(i).forEach(el => {
            newColor += ca.getColor(colors, el) / 10;
        });
        ca.setColor(newColors, i, newColor);

    }
}



/* This code comes from Academo.org */
class Demo {
    constructor() {
        this.wavelength = {
            title: "Wavelength",
            value: 500,
            units: "nm",
            range: [380, 780],
            resolution: 1
        }
    }

    nmToRGB(wavelength) {
        var Gamma = 0.80,
            IntensityMax = 255,
            factor, red, green, blue;
        if ((wavelength >= 380) && (wavelength < 440)) {
            red = -(wavelength - 440) / (440 - 380);
            green = 0.0;
            blue = 1.0;
        } else if ((wavelength >= 440) && (wavelength < 490)) {
            red = 0.0;
            green = (wavelength - 440) / (490 - 440);
            blue = 1.0;
        } else if ((wavelength >= 490) && (wavelength < 510)) {
            red = 0.0;
            green = 1.0;
            blue = -(wavelength - 510) / (510 - 490);
        } else if ((wavelength >= 510) && (wavelength < 580)) {
            red = (wavelength - 510) / (580 - 510);
            green = 1.0;
            blue = 0.0;
        } else if ((wavelength >= 580) && (wavelength < 645)) {
            red = 1.0;
            green = -(wavelength - 645) / (645 - 580);
            blue = 0.0;
        } else if ((wavelength >= 645) && (wavelength < 781)) {
            red = 1.0;
            green = 0.0;
            blue = 0.0;
        } else {
            red = 0.0;
            green = 0.0;
            blue = 0.0;
        };
        // Let the intensity fall off near the vision limits
        if ((wavelength >= 380) && (wavelength < 420)) {
            factor = 0.3 + 0.7 * (wavelength - 380) / (420 - 380);
        } else if ((wavelength >= 420) && (wavelength < 701)) {
            factor = 1.0;
        } else if ((wavelength >= 701) && (wavelength < 781)) {
            factor = 0.3 + 0.7 * (780 - wavelength) / (780 - 700);
        } else {
            factor = 0.0;
        };
        if (red !== 0) {
            red = Math.round(IntensityMax * Math.pow(red * factor, Gamma));
        }
        if (green !== 0) {
            green = Math.round(IntensityMax * Math.pow(green * factor, Gamma));
        }
        if (blue !== 0) {
            blue = Math.round(IntensityMax * Math.pow(blue * factor, Gamma));
        }
        return [red, green, blue];
    }
    toHex(number) {
        //converts a decimal number into hex format
        var hex = number.toString(16);
        if (hex.length < 2) {
            hex = "0" + hex;
        }
        return hex;
    }
    rgbToHex(color) {
        //takes an 3 element array (r,g,b) and returns a hexadecimal color
        var hexString = '#';
        for (var i = 0; i < 3; i++) {
            hexString += this.toHex(color[i]);
        }
        return hexString;
    }

};
