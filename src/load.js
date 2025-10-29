import { Assets } from "pixi.js";
import { genericText } from "./ui/text.js";

export async function loadAssets(stage) {
  const onError = (err, asset) => console.debug("Retrying:", asset.src);

  await Assets.init({
    manifest: "manifest.json",
    loadOptions: {
      strategy: "retry",
      retryCount: 4,
      retryDelay: 400,
      onError: onError,
    },
  }).catch((e) => console.log(e));

  // genericText is centered by default (but only the game will resize automatically)
  const loadingText = genericText("Loading...");
  stage.addChild(loadingText);

  const onProgress = (progress) => {
    loadingText.text = `Loading... ${Math.round(progress * 100)}%`;
    console.log(`Loading:`, loadingText.text);
  };

  await Assets.loadBundle("game-screen", onProgress).catch((e) =>
    console.log(e)
  );

  stage.removeChild(loadingText);
}
