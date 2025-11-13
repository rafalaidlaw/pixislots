import { Graphics } from "pixi.js";

export function bgRectangle(gameContainer, margin, reelContainer) {
  const background = new Graphics();
  background.rect(0, margin, gameContainer.width, reelContainer.height, 20);
  background.fill({ color: 0x888888 });

  gameContainer.addChildAt(background, 0);

  const top = new Graphics();
  top.roundRect(0, 0, gameContainer.width, margin, 20);
  top.fill({ color: 0x444444 });
  gameContainer.addChild(top);

  const capTop = new Graphics();
  capTop.rect(0, margin - 20, gameContainer.width, 20);
  capTop.fill({ color: 0x333333 });
  gameContainer.addChild(capTop);

  const bottom = new Graphics();
  bottom.roundRect(
    0,
    reelContainer.height + margin,
    gameContainer.width,
    margin + 310,
    20
  );
  bottom.fill({ color: 0x444444 });
  gameContainer.addChild(bottom);

  const capBottom = capTop.clone();
  capBottom.y = reelContainer.height + 20;
  gameContainer.addChild(capBottom);
}
