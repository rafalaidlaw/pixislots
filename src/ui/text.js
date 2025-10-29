import { Text } from "pixi.js";

export function genericText(value) {
  return new Text({
    text: value,
    style: {
      fontFamily: "Arial",
      fontSize: 36,
      fill: "#d46a6a",
      align: "center",
    },
    anchor: 0.5,
    x: screen.width / 2,
    y: screen.height / 2,
  });
}
