import { startGame, gameResize } from "./game.js";
import { loadAssets } from "./load.js";
import * as PIXI from "pixi.js";

const app = new PIXI.Application();

function resize() {
  app.renderer.resize(window.innerWidth, window.innerHeight);
  gameResize(app);
}

(async () => {
  await app.init({
    backgroundColor: 0xaa3939,
  });

  app.canvas.style.position = "absolute";

  document.body.appendChild(app.canvas);
  addEventListener("resize", resize);
  resize();

  await loadAssets(app.stage).catch((e) => console.log(e));

  startGame(app);
})();
