// const Color = require("../dist/index.js");
import { Color, AnalogousColorScheme } from "../dist/index.js";

import chai from "chai";
const { expect } = chai;
// const { Color } = cc;

describe("***** Color Object Creation Tests *****", function () {
  it(`should create a White color`, function () {
    const color = new Color();
    expect(color.r).to.equal(255);
    expect(color.g).to.equal(255);
    expect(color.b).to.equal(255);
    expect(color.h).to.above(-1).below(361);
    expect(color.s).to.above(-1).below(101);
    expect(color.l).to.equal(100);
  });
  it(`Should create a Color instance from a valid No # Hex string`, function () {
    const color = new Color("DA09EB");
    expect(color.r).to.equal(218);
    expect(color.g).to.equal(9);
    expect(color.b).to.equal(235);
    expect(color.h).to.equal(295);
    expect(color.s).to.equal(93);
    expect(color.l).to.equal(48);
  });
  it(`Should create a Color instance from a valid Hex string`, function () {
    const color = new Color("#DA09EB");
    expect(color.r).to.equal(218);
    expect(color.g).to.equal(9);
    expect(color.b).to.equal(235);
    expect(color.h).to.equal(295);
    expect(color.s).to.equal(93);
    expect(color.l).to.equal(48);
  });
  it(`Should create a Color instance from a valid RGB string`, function () {
    const color = new Color("rgb  (     71, 9,235)");
    expect(color.r).to.equal(71);
    expect(color.g).to.equal(9);
    expect(color.b).to.equal(235);
    expect(color.h).to.equal(256);
    expect(color.s).to.equal(93);
    expect(color.l).to.equal(48);
  });
  it(`Should create a Color instance from a valid No % HSL string`, function () {
    const color = new Color("hsl  (     275, 38,34)");
    expect(color.r).to.within(91, 92);
    expect(color.g).to.within(53, 54);
    expect(color.b).to.within(119, 120);
    expect(color.h).to.equal(275);
    expect(color.s).to.equal(38);
    expect(color.l).to.equal(34);
  });
  it(`Should create a Color instance from a valid HSL string`, function () {
    const color = new Color("hsl  (     275, 38%,34     %)");
    expect(color.r).to.within(91, 92);
    expect(color.g).to.within(53, 54);
    expect(color.b).to.within(119, 120);
    expect(color.h).to.equal(275);
    expect(color.s).to.equal(38);
    expect(color.l).to.equal(34);
  });
  it(`Should throw an error for an invalid color string`, function () {
    expect(() => new Color("hslssdf(275, 38,34)")).to.throw("Invalid Color");
    expect(() => new Color("rgbs(275, 38,34)")).to.throw("Invalid Color");
    expect(() => new Color("#cwqd56")).to.throw("Invalid Color");
  });
  it(`Should create a Color instance from a valid HSL Object`, function () {
    const color = new Color({ h: 295, s: 93, l: 48 });
    expect(color.r).to.within(217, 219);
    expect(color.g).to.within(8, 10);
    expect(color.b).to.within(234, 236);
    expect(color.h).to.equal(295);
    expect(color.s).to.equal(93);
    expect(color.l).to.equal(48);
  });
  it(`Should create a Color instance from a valid RGB Object`, function () {
    const color = new Color({ r: 69, g: 9, b: 236 });
    expect(color.r).to.equal(69);
    expect(color.g).to.equal(9);
    expect(color.b).to.equal(236);
    expect(color.h).to.equal(256);
    expect(color.s).to.equal(93);
    expect(color.l).to.equal(48);
  });
  it(`Should create a Color instance from a valid Color Object`, function () {
    const color = new Color({ r: 69, g: 9, b: 236, h: 56, s: 2, l: 96 });
    expect(color.r).to.equal(69);
    expect(color.g).to.equal(9);
    expect(color.b).to.equal(236);
    expect(color.h).to.equal(256);
    expect(color.s).to.equal(93);
    expect(color.l).to.equal(48);
  });
  it(`Should throw an error for an invalid color object`, function () {
    expect(() => new Color({ h: 56, s: 59, b: 100 })).to.throw("Invalid Color");
    expect(() => new Color({ r: 56, s: 59, b: 100 })).to.throw("Invalid Color");
    // expect(() => new Color("#cwqd56")).to.throw("Invalid Color");
  });
});

describe("***** Color Setters Tests *****", () => {
  const hex = "da09eb";
  it("should set the red value of a color", () => {
    const color = new Color(hex);
    color.setRed(300);
    expect(color.r).to.equal(255);
    expect(color.h).to.equal(305);
    expect(color.s).to.equal(100);
    expect(color.l).to.equal(52);
  });
  it("should set the blue value of a color", () => {
    const color = new Color(hex);

    color.setBlue(-5656);
    expect(color.b).to.equal(0);
    expect(color.h).to.equal(2);
    expect(color.s).to.equal(100);
    expect(color.l).to.equal(43);
  });
  it("should set the green value of a color", () => {
    const color = new Color(hex);
    color.setGreen(157);
    expect(color.g).to.equal(157);
    expect(color.h).to.equal(287);
    expect(color.s).to.equal(66);
    expect(color.l).to.equal(77);
  });
  it("should set the hue value of a color", () => {
    // const color = new Color("rgb(218, 9, 235)");
    const color = new Color(hex);
    color.setHue(120);
    expect(color.h).to.equal(120);
    expect(color.r).to.within(8, 10);
    expect(color.g).to.within(235, 237);
    expect(color.b).to.within(8, 10);
  });
  // it("should set the saturation value of a color", () => {
  //   const color = new Color(hex);
  //   color.setSaturation(120);
  //   expect(color.h).to.equal(120);
  //   expect(color.r).to.equal(230);
  //   expect(color.g).to.equal(250);
  //   expect(color.b).to.equal(230);
  // });
});

new AnalogousColorScheme(6);
