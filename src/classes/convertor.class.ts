import { hslObject, rgbObject } from "../interfaces/color.interfaces";

export class Convertor {
  static HSLtoRGB(hsl: hslObject) {
    let { h, s, l } = hsl;
    h = h % 360;
    s = s / 100;
    l = l / 100;
    // console.log("object", h,s,l)

    const C: number = (1 - Math.abs(2 * l - 1)) * s;

    const X: number = C * (1 - Math.abs(((h / 60) % 2) - 1));

    const m: number = l - C / 2;

    let r: number = 255,
      g: number = 255,
      b: number = 255;

    if (h >= 0 && h < 60) {
      r = C;
      g = X;
      b = 0;
    } else if (h >= 60 && h < 120) {
      r = X;
      g = C;
      b = 0;
    } else if (h >= 120 && h < 180) {
      r = 0;
      g = C;
      b = X;
    } else if (h >= 180 && h < 240) {
      r = 0;
      g = X;
      b = C;
    } else if (h >= 240 && h < 300) {
      r = X;
      g = 0;
      b = C;
    } else if (h >= 300 && h < 360) {
      r = C;
      g = 0;
      b = X;
    }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    // console.log(r, g, b)
    const rgb: rgbObject = { r, g, b };

    return rgb;
  }
  static HSLtoHEX(hsl: hslObject) {
    const rgb: rgbObject = Convertor.HSLtoRGB(hsl);
    const hex: string = Convertor.RGBtoHEX(rgb);
    return hex;
  }
  static RGBtoHSL(rgb: rgbObject) {
    let { r, g, b } = rgb;
    r /= 255;
    g /= 255;
    b /= 255;

    const max: number = Math.max(r, g, b);
    const min: number = Math.min(r, g, b);
    let hsl: hslObject = { h: 0, s: 0, l: (max + min) / 2 };

    if (max === min) {
      // Grayscale
      hsl.h = hsl.s = 0;
      return hsl;
    }
    const d: number = max - min;
    hsl.s = hsl.l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        hsl.h = (g - b) / d + (g < b ? 6 : 0);
        hsl.h /= 6;

        break;
      case g:
        hsl.h = (b - r) / d + 2;
        hsl.h /= 6;

        break;
      case b:
        hsl.h = (r - g) / d + 4;
        hsl.h /= 6;

        break;
      default:
    }
    // console.log(hsl);
    hsl.h = Math.round(hsl.h * 360);
    hsl.s = Math.round(hsl.s * 100);
    hsl.l = Math.round(hsl.l * 100);
    // console.log(hsl);
    return hsl;
  }
  static RGBtoHEX(rgb: rgbObject) {
    // Convert each component to a hexadecimal string
    const redHex: string = rgb.r.toString(16).padStart(2, "0");
    const greenHex: string = rgb.g.toString(16).padStart(2, "0");
    const blueHex: string = rgb.b.toString(16).padStart(2, "0");

    // Combine the hexadecimal components into a single string
    const hexColor: string = `${redHex}${greenHex}${blueHex}`;

    return hexColor.toUpperCase();
  }
  static HEXtoRGB(hex: string) {
    if (hex[0] === "#") {
      hex = hex.slice(1);
    }
    let diff: number = hex.length / 3;
    let rgb: rgbObject = {
      r: parseInt(hex.slice(0, 0 + diff), 16),
      g: parseInt(hex.slice(diff, 2 * diff), 16),
      b: parseInt(hex.slice(2 * diff), 16),
    };
    console.log(rgb);
    return rgb;
  }
  static HEXtoHSL(hex: string) {
    const rgb: rgbObject = Convertor.HEXtoRGB(hex);
    const hsl: hslObject = Convertor.RGBtoHSL(rgb);
    return hsl;
  }
}
