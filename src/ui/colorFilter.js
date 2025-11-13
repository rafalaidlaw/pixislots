import * as PIXI from "pixi.js";

export function createColorFilter() {
  const colorMatrix = new PIXI.ColorMatrixFilter();
  // Grayscale conversion using luminance formula: 0.299*R + 0.587*G + 0.114*B
  colorMatrix.matrix = [
    0.299, 0.587, 0.114, 0, 0, // Red channel
    0.299, 0.587, 0.114, 0, 0, // Green channel
    0.299, 0.587, 0.114, 0, 0, // Blue channel
    0,     0,     0,     1, 0, // Alpha channel (unchanged)
    0,     0,     0,     0, 1, // Offset row
  ];
  return colorMatrix;
}

export function createWhiteFilter() {
  const colorMatrix = new PIXI.ColorMatrixFilter();
  // White filter: convert to grayscale then brighten to white
  // This creates a white/light gray appearance
  // Formula: grayscale luminance, then add brightness offset
  const brightness = 0.8; // Brightness offset (0-1 range)
  colorMatrix.matrix = [
    0.299, 0.587, 0.114, 0, brightness, // Red: grayscale + brightness
    0.299, 0.587, 0.114, 0, brightness, // Green: grayscale + brightness
    0.299, 0.587, 0.114, 0, brightness, // Blue: grayscale + brightness
    0,     0,     0,     1, 0,            // Alpha (unchanged)
    0,     0,     0,     0, 1,            // Offset row
  ];
  return colorMatrix;
}