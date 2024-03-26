import { colorObject } from "../interfaces/color.interfaces";
import { Color } from "./color.class";

class ColorScheme {
  length: number = 3;
  baseColor?: Color = new Color();
  constructor(length: number = 3) {
    this.length = length;
  }

  setBaseColor(color: string) {
    this.baseColor = new Color(color);
    return this;
  }

  getBaseColor() {
    return this.baseColor;
  }
}

export class AnalogousColorScheme extends ColorScheme {
  scheme: Array<Color> = [];

  constructor(length: number = 3) {
    super(length);
    console.log(this.length);
    console.log(this.scheme);
    console.log(this.baseColor);
    console.log("Coming Soon");
  }

  generate() {}
}

// new AnalogousColorScheme(6);
