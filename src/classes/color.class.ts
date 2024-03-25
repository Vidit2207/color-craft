import { hslObject, rgbObject } from "../interfaces/color.interfaces";
import { Convertor } from "./convertor.class";

interface colorObject {
  r: number;
  g: number;
  b: number;
  h: number;
  s: number;
  l: number;
  a: number;
}
export class Color {
  r: number = 255;
  g: number = 255;
  b: number = 255;
  h: number = 0;
  s: number = 100;
  l: number = 100;
  a: number = 1;
  constructor();
  constructor(colorStr: string);
  constructor(colorObject: colorObject);
  constructor(color?: string | colorObject) {
    if (!color) {
      console.log("Color created: #FFFFFF");
      return;
    }

    // try {
    if (typeof color === "string") {
      color = color.replaceAll(/[ \t]+/g, "").toLowerCase();
      const regexHex: RegExp = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      const regexRGB: RegExp = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/;
      const regexHSL: RegExp = /hsl\((\d{1,3}),(\d{1,3})%?,(\d{1,3})%?\)/;

      if (regexHex.test(color)) {
        console.log("Hex");
        const rgb: rgbObject = Convertor.HEXtoRGB(color);
        this.r = rgb.r;
        this.g = rgb.g;
        this.b = rgb.b;
        const hsl: hslObject = Convertor.RGBtoHSL(rgb);
        this.h = hsl.h;
        this.s = hsl.s;
        this.l = hsl.l;
      } else if (regexHSL.test(color)) {
        console.log("HSL");
        color = color.slice(4, color.length - 1);
        const colorArray = color.split(",");

        this.h = parseInt(colorArray[0]);
        this.s = parseInt(colorArray[1]);
        this.l = parseInt(colorArray[2]);
        const rgb: rgbObject = Convertor.HSLtoRGB({
          h: this.h,
          s: this.s,
          l: this.l,
        });
        //   console.log(rgb);
        this.r = rgb.r;
        this.g = rgb.g;
        this.b = rgb.b;
      } else if (regexRGB.test(color)) {
        console.log("RGB");
        color = color.slice(4, color.length - 1);
        const colorArray = color.split(",");

        this.r = parseInt(colorArray[0]);
        this.g = parseInt(colorArray[1]);
        this.b = parseInt(colorArray[2]);
        const hsl: hslObject = Convertor.RGBtoHSL({
          r: this.r,
          g: this.g,
          b: this.b,
        });
        this.h = hsl.h;
        this.s = hsl.s;
        this.l = hsl.l;
      } else {
        throw new Error("Invalid Color");
      }
    } else if (typeof color === "object") {
      if (color.r && color.g && color.b) {
        this.r = Math.max(0, Math.min(255, color.r));
        this.g = Math.max(0, Math.min(255, color.g));
        this.b = Math.max(0, Math.min(255, color.b));
        const hsl: hslObject = Convertor.RGBtoHSL({
          r: this.r,
          g: this.g,
          b: this.b,
        });
        this.h = hsl.h;
        this.s = hsl.s;
        this.l = hsl.l;
        // convert to hsl and assign values
      } else if (color.h && color.s && color.l) {
        this.h = (color.h + 360) % 360;
        this.s = Math.max(0, Math.min(100, color.s));
        this.l = Math.max(0, Math.min(100, color.l));
        const rgb: rgbObject = Convertor.HSLtoRGB({
          h: this.h,
          s: this.s,
          l: this.l,
        });
        this.r = rgb.r;
        this.g = rgb.g;
        this.b = rgb.b;
        // convert to rgb and assign values
      } else {
        throw new Error("Invalid Color");
      }
    }
    // } catch (error) {}

    console.log("Color created");
  }

  //red-f//Setters - red, blue, green, hue, sat, light, alpha, RGB, HSL
  setRed(value: number) {
    this.r = Math.max(0, Math.min(255, value));
    const hsl: hslObject = Convertor.RGBtoHSL(this);
    this.h = hsl.h;
    this.s = hsl.s;
    this.l = hsl.l;
    return this;
  }
  setBlue(value: number) {
    this.b = Math.max(0, Math.min(255, value));
    const hsl: hslObject = Convertor.RGBtoHSL(this);
    this.h = hsl.h;
    this.s = hsl.s;
    this.l = hsl.l;
    return this;
  }
  setGreen(value: number) {
    this.g = Math.max(0, Math.min(255, value));
    const hsl: hslObject = Convertor.RGBtoHSL(this);
    this.h = hsl.h;
    this.s = hsl.s;
    this.l = hsl.l;
    return this;
  }
  setHue(value: number) {
    this.h = (360 + value) % 360;
    const rgb: rgbObject = Convertor.HSLtoRGB(this);
    this.r = rgb.r;
    this.g = rgb.g;
    this.b = rgb.b;
    return this;
  }
  setSaturation(value: number) {
    this.s = Math.max(0, Math.min(100, value));
    const rgb: rgbObject = Convertor.HSLtoRGB(this);
    this.r = rgb.r;
    this.g = rgb.g;
    this.b = rgb.b;
    return this;
  }
  setLightness(value: number) {
    this.l = Math.max(0, Math.min(255, value));
    const rgb: rgbObject = Convertor.HSLtoRGB(this);
    this.r = rgb.r;
    this.g = rgb.g;
    this.b = rgb.b;
    return this;
  }
  setAlpha(value: number) {
    this.a = Math.max(0, Math.min(1, value));
    return this;
  }
  setRGB(rgb: rgbObject) {
    this.setRed(rgb.r);
    this.setGreen(rgb.g);
    this.setBlue(rgb.b);
    return this;
  }
  setHSL(hsl: hslObject) {
    this.setHue(hsl.h);
    this.setSaturation(hsl.s);
    this.setLightness(hsl.l);
    return this;
  }

  //red-f//Getters - red, blue, green, hue, sat, light, alpha, RGB, HSL
  getRed() {
    return this.r;
  }
  getGreen() {
    return this.g;
  }
  getBlue() {
    return this.b;
  }
  getHue() {
    return this.h;
  }
  getSaturation() {
    return this.s;
  }
  getLightness() {
    return this.l;
  }
  getAlpha() {
    return this.a;
  }
  getHSL() {
    return { h: this.h, s: this.s, l: this.l };
  }
  getRGB() {
    return { r: this.r, g: this.g, b: this.b };
  }

  adjustHue(value: number) {
    this.setHue(this.h + (value % 360));
    return this;
  }
  lighten(value: number) {
    this.setLightness(this.l + value);
    return this;
  }
  darken(value: number) {
    this.setLightness(this.l - value);
    return this;
  }
  saturate(value: number) {
    this.setSaturation(this.s + value);
    return this;
  }
  desaturate(value: number) {
    this.setSaturation(this.s - value);
    return this;
  }
  adjustRed(value: number) {
    this.setRed(this.r + value);
    return this;
  }
  adjustBlue(value: number) {
    this.setBlue(this.b + value);
    return this;
  }
  adjustGreen(value: number) {
    this.setGreen(this.g + value);
    return this;
  }
  grayscale() {
    this.setSaturation(0);
    return this;
  }
  complement() {
    this.setRed(255 - this.r)
      .setGreen(255 - this.g)
      .setBlue(255 - this.b);
    return this;
  }

  //red-f// Formatters
  hsl() {
    return `hsl(${this.h}, ${this.s}%, ${this.l}%)`;
  }
  hsla() {
    return `hsl(${this.h}, ${this.s}%, ${this.l}%, ${this.a})`;
  }
  rgb() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }
  rgba() {
    return `rgb(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }
}
