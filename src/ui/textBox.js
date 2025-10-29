import { Graphics, Container } from "pixi.js";
import { genericText } from "./text.js";

export function createWinningsTextBox(container) {
  const textBoxWidth = container.width * 0.65;
  const textBoxHeight = container.height / 4;

  const textBoxX = 35;
  const textBoxY = 877;

  const winningsTextBox = new Container();
  winningsTextBox.x = textBoxX;
  winningsTextBox.y = textBoxY;
  container.addChild(winningsTextBox);

  const textBoxBackground = new Graphics();
  textBoxBackground.roundRect(0, 0, textBoxWidth, textBoxHeight, 10);
  textBoxBackground.fill({ color: 0x550000, alpha: 0.8 });
  winningsTextBox.addChild(textBoxBackground);

  const textBoxText = genericText("");
  textBoxText.x = textBoxWidth / 2;
  textBoxText.y = textBoxHeight / 2;
  textBoxText.anchor.set(0.5, 0.5);
  winningsTextBox.addChild(textBoxText);

  winningsTextBox.updateText = (text) => {
    textBoxText.text = text;
  };

  return winningsTextBox;
}
