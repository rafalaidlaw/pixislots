import * as PIXI from "pixi.js";
import { createWinningsTextBox } from "./ui/textBox.js";
import { bgRectangle } from "./ui/bgRectangle.js";
import { createColorFilter } from "./ui/colorFilter.js";
import { createSpinButton } from "./ui/spinButton.js";

const reelBands = [
  [
    "hv2",
    "lv3",
    "lv3",
    "hv1",
    "hv1",
    "lv1",
    "hv1",
    "hv4",
    "lv1",
    "hv3",
    "hv2",
    "hv3",
    "lv4",
    "hv4",
    "lv1",
    "hv2",
    "lv4",
    "lv1",
    "lv3",
    "hv2",
  ],
  [
    "hv1",
    "lv2",
    "lv3",
    "lv2",
    "lv1",
    "lv1",
    "lv4",
    "lv1",
    "lv1",
    "hv4",
    "lv3",
    "hv2",
    "lv1",
    "lv3",
    "hv1",
    "lv1",
    "lv2",
    "lv4",
    "lv3",
    "lv2",
  ],
  [
    "lv1",
    "hv2",
    "lv3",
    "lv4",
    "hv3",
    "hv2",
    "lv2",
    "hv2",
    "hv2",
    "lv1",
    "hv3",
    "lv1",
    "hv1",
    "lv2",
    "hv3",
    "hv2",
    "hv4",
    "hv1",
    "lv2",
    "lv4",
  ],
  [
    "hv2",
    "lv2",
    "hv3",
    "lv2",
    "lv4",
    "lv4",
    "hv3",
    "lv2",
    "lv4",
    "hv1",
    "lv1",
    "hv1",
    "lv2",
    "hv3",
    "lv2",
    "lv3",
    "hv2",
    "lv1",
    "hv3",
    "lv2",
  ],
  [
    "lv3",
    "lv4",
    "hv2",
    "hv3",
    "hv4",
    "hv1",
    "hv3",
    "hv2",
    "hv2",
    "hv4",
    "hv4",
    "hv2",
    "lv2",
    "hv4",
    "hv1",
    "lv2",
    "hv1",
    "lv2",
    "hv4",
    "lv4",
  ],
];

const gameContainer = new PIXI.Container();

const PAYLINES = [
  [1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0],
  [2, 2, 2, 2, 2],
  [0, 0, 1, 2, 2],
  [2, 2, 1, 0, 0],
  [0, 1, 2, 1, 0],
  [2, 1, 0, 1, 2],
];

const paylineMap = new Map();
PAYLINES.forEach((line, index) => {
  paylineMap.set(line.join(","), index + 1);
});

const PAYTABLE = {
  hv1: { 3: 10, 4: 20, 5: 50 },
  hv2: { 3: 5, 4: 10, 5: 20 },
  hv3: { 3: 5, 4: 10, 5: 15 },
  hv4: { 3: 5, 4: 10, 5: 15 },
  lv1: { 3: 2, 4: 5, 5: 10 },
  lv2: { 3: 1, 4: 2, 5: 5 },
  lv3: { 3: 1, 4: 2, 5: 3 },
  lv4: { 3: 1, 4: 2, 5: 3 },
};

function calculateWinnings(symbol, streak) {
  if (streak < 3) return 0;
  return PAYTABLE[symbol]?.[streak] || 0;
}

let reelContainer;
let position = [0, 0, 0, 0, 0];
let winningsTextBox;

export function gameResize(app) {
  gameContainer.width = app.screen.width / 2;
  gameContainer.scale.y = gameContainer.scale.x;
  gameContainer.position.set(app.screen.width * 0.25, 5);
}

export function startGame(app) {
  app.stage.addChild(gameContainer);
  const margin = 80;

  reelContainer = new PIXI.Container();
  reelContainer.y = margin;

  gameContainer.addChild(reelContainer);

  renderReels(position);

  bgRectangle(gameContainer, margin, reelContainer);

  const spinButton = createSpinButton(
    gameContainer,
    reelContainer,
    margin,
    () => {
      position = getRandomLocations();
      renderReels(position);

      const wins = checkWinningLines(position);
      updateWinningsText(wins);
    }
  );

  winningsTextBox = createWinningsTextBox(gameContainer);

  gameResize(app);
}

function renderReels(positions) {
  reelContainer.removeChildren();

  positions.forEach((startIndex, reelIndex) => {
    const singleReelContainer = new PIXI.Container();
    reelContainer.addChild(singleReelContainer);

    for (let row = 0; row < 3; row++) {
      const symbolIndex = (startIndex + row) % reelBands[reelIndex].length;
      const symbolName = reelBands[reelIndex][symbolIndex];

      const texture = PIXI.Texture.from(symbolName);
      const cellSprite = new PIXI.Sprite(texture);
      cellSprite.x = texture.width * reelIndex;
      cellSprite.y = texture.height * row;
      cellSprite.scale.set(0.9);
      cellSprite.filters = [createColorFilter()];

      singleReelContainer.addChild(cellSprite);
    }
  });
}

function getRandomLocations() {
  const locations = [];
  for (let i = 0; i < 5; i++) {
    locations.push(Math.floor(Math.random() * reelBands[0].length));
  }
  return locations;
}

function checkWinningLines(positions) {
  const wins = [];

  PAYLINES.forEach((line) => {
    const symbols = [];
    for (let i = 0; i < 5; i++) {
      const symbolIndex = (positions[i] + line[i]) % reelBands[i].length;
      const symbolName = reelBands[i][symbolIndex];

      symbols.push(symbolName);
    }

    let maxStreak = 1;
    let streak = 1;
    let bestSymbol;
    for (let i = 1; i < symbols.length; i++) {
      if (symbols[i] === symbols[i - 1]) {
        streak++;
      } else {
        streak = 1;
      }

      if (streak > maxStreak) {
        maxStreak = streak;
        bestSymbol = symbols[i];
      }
    }

    if (maxStreak >= 3) {
      wins.push({
        line,
        symbols,
        maxStreak,
        bestSymbol,
      });
    }
  });

  return wins;
}

function updateWinningsText(wins) {
  let displayText = "";
  if (wins.length === 0) {
    displayText = "You Lost!";
  } else {
    let totalWins = 0;
    let line1Text = "";
    let line2Text = "";
    let line3Text = "";

    wins.forEach((win, index) => {
      const winAmount = calculateWinnings(win.bestSymbol, win.maxStreak);
      totalWins += winAmount;

      const paylineId = paylineMap.get(win.line.join(","));
      const winDetail = `Line ${paylineId}: ${win.bestSymbol} x${win.maxStreak} (${winAmount}pts)`;

      if (index < 2) {
        if (line1Text) line1Text += " | ";
        line1Text += winDetail;
      } else if (index < 4) {
        if (line2Text) line2Text += " | ";
        line2Text += winDetail;
      } else {
        if (line3Text) line3Text += " | ";
        line3Text += winDetail;
      }
    });

    const totalText = `Total: ${totalWins} points`;
    displayText = `${totalText}\n${line1Text}`;

    if (line2Text) {
      displayText += `\n${line2Text}`;
    }

    if (line3Text) {
      displayText += `\n${line3Text}`;
    }
  }

  winningsTextBox.updateText(displayText);
}

export { checkWinningLines, getRandomLocations, calculateWinnings };
