import * as PIXI from "pixi.js";

export function createColorFilter() {
  const colorMatrix = new PIXI.ColorMatrixFilter();
  colorMatrix.matrix = [
    1,
    0,
    0,
    0,
    122 / 255, // Red channel
    0,
    1,
    0,
    0,
    19 / 255, // Green channel
    0,
    0,
    1,
    0,
    17 / 255, // Blue channel
    0,
    0,
    0,
    1,
    0, // Alpha channel
  ];
  return colorMatrix;
}
