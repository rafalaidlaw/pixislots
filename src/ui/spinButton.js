import * as PIXI from "pixi.js";
import { createColorFilter } from "./colorFilter.js";

export function createSpinButton(
  gameContainer,
  reelContainer,
  margin,
  onSpinClick
) {
  const spinButton = new PIXI.Sprite(PIXI.Texture.from("spin_button"));
  spinButton.eventMode = "static";
  spinButton.cursor = "pointer";
  spinButton.anchor.set(0.5);
  spinButton.scale.set(1);

  const buttonY = reelContainer.height + margin + spinButton.height / 1.25;
  const buttonX = gameContainer.width * 0.84;
  spinButton.position.set(buttonX, buttonY);
  spinButton.filters = [createColorFilter()];

  const spinButtonBackground = new PIXI.Graphics();
  const radius = spinButton.width / 2;
  spinButtonBackground.circle(0, 0, radius);
  spinButtonBackground.fill({ color: 0x707070 });
  spinButtonBackground.position.set(spinButton.x + 1, spinButton.y + 1);
  gameContainer.addChild(spinButtonBackground);

  spinButton.on("pointerover", () => {
    spinButtonBackground.clear();
    spinButtonBackground.circle(0, 0, radius);
    spinButtonBackground.fill({ color: 0x888888 });
  });

  spinButton.on("pointerout", () => {
    spinButtonBackground.clear();
    spinButtonBackground.circle(0, 0, radius);
    spinButtonBackground.fill({ color: 0x707070 });
  });

  let isSpinning = false;

  spinButton.on("pointerdown", () => {
    if (isSpinning) return; // Prevent multiple clicks during spin

    isSpinning = true;
    console.log("Spin clicked!");

    spinButton.eventMode = "none";

    onSpinClick();

    setTimeout(() => {
      isSpinning = false;
      spinButton.eventMode = "static";
    }, 100);
  });

  gameContainer.addChild(spinButton);

  return spinButton;
}
