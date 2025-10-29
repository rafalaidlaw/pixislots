import {
  checkWinningLines,
  calculateWinnings,
  getRandomLocations,
} from "./game.js";

describe("checkWinningLines", () => {
  test("validates no wins", () => {
    /*
     * lv3 hv1 lv1 hv2 lv3
     * lv3 lv2 hv2 lv2 lv4
     * hv1 lv3 lv3 hv3 hv2
     * */
    const positions = [1, 0, 0, 0, 0];
    const wins = checkWinningLines(positions);
    expect(wins.length).toBe(0);
  });

  test("validates one win", () => {
    /*
     * hv2 hv1 lv1 hv2 lv3
     * hv3 lv2 hv2 lv2 lv4
     * lv3 lv3 lv3 hv3 hv2
     * */
    const positions = [0, 0, 0, 0, 0];
    const wins = checkWinningLines(positions);
    expect(wins.length).toBe(1);
    expect(wins[0]).toEqual({
      line: [2, 2, 2, 2, 2],
      symbols: ["lv3", "lv3", "lv3", "hv3", "hv2"],
      maxStreak: 3,
      bestSymbol: "lv3",
    });
  });

  test("validates multiple wins", () => {
    /*
     * hv2 hv1 lv1 lv2 lv3
     * hv3 lv2 hv2 lv3 lv4
     * lv3 lv3 lv3 hv2 hv2
     * */
    const positions = [0, 0, 0, 14, 0];
    const wins = checkWinningLines(positions);
    expect(wins.length).toBe(3);

    expect(wins).toEqual([
      {
        line: [2, 2, 2, 2, 2],
        symbols: ["lv3", "lv3", "lv3", "hv2", "hv2"],
        maxStreak: 3,
        bestSymbol: "lv3",
      },
      {
        line: [0, 0, 1, 2, 2],
        symbols: ["hv2", "hv1", "hv2", "hv2", "hv2"],
        maxStreak: 3,
        bestSymbol: "hv2",
      },
      {
        line: [0, 1, 2, 1, 0],
        symbols: ["hv2", "lv2", "lv3", "lv3", "lv3"],
        maxStreak: 3,
        bestSymbol: "lv3",
      },
    ]);
  });
});

describe("calculateWinnings", () => {
  test("calculates winnings for high value symbols", () => {
    expect(calculateWinnings("hv1", 3)).toBe(10);
    expect(calculateWinnings("hv1", 4)).toBe(20);
    expect(calculateWinnings("hv1", 5)).toBe(50);

    expect(calculateWinnings("hv2", 3)).toBe(5);
    expect(calculateWinnings("hv2", 4)).toBe(10);
    expect(calculateWinnings("hv2", 5)).toBe(20);

    expect(calculateWinnings("hv3", 3)).toBe(5);
    expect(calculateWinnings("hv3", 4)).toBe(10);
    expect(calculateWinnings("hv3", 5)).toBe(15);

    expect(calculateWinnings("hv4", 3)).toBe(5);
    expect(calculateWinnings("hv4", 4)).toBe(10);
    expect(calculateWinnings("hv4", 5)).toBe(15);
  });

  test("calculates winnings for low value symbols", () => {
    expect(calculateWinnings("lv1", 3)).toBe(2);
    expect(calculateWinnings("lv1", 4)).toBe(5);
    expect(calculateWinnings("lv1", 5)).toBe(10);

    expect(calculateWinnings("lv2", 3)).toBe(1);
    expect(calculateWinnings("lv2", 4)).toBe(2);
    expect(calculateWinnings("lv2", 5)).toBe(5);

    expect(calculateWinnings("lv3", 3)).toBe(1);
    expect(calculateWinnings("lv3", 4)).toBe(2);
    expect(calculateWinnings("lv3", 5)).toBe(3);

    expect(calculateWinnings("lv4", 3)).toBe(1);
    expect(calculateWinnings("lv4", 4)).toBe(2);
    expect(calculateWinnings("lv4", 5)).toBe(3);
  });

  //edge cases
  test("returns zero for streaks less than 3", () => {
    expect(calculateWinnings("hv1", 1)).toBe(0);
    expect(calculateWinnings("hv1", 2)).toBe(0);
    expect(calculateWinnings("lv1", 1)).toBe(0);
    expect(calculateWinnings("lv1", 2)).toBe(0);
  });

  test("returns zero for invalid symbols", () => {
    expect(calculateWinnings("invalid", 3)).toBe(0);
    expect(calculateWinnings("hv5", 3)).toBe(0);
    expect(calculateWinnings("", 3)).toBe(0);
    expect(calculateWinnings(null, 3)).toBe(0);
  });

  test("returns zero for streaks greater than 5", () => {
    expect(calculateWinnings("hv1", 6)).toBe(0);
    expect(calculateWinnings("lv1", 10)).toBe(0);
  });
});

describe("getRandomLocations", () => {
  test("returns array of 5 numbers", () => {
    const locations = getRandomLocations();
    expect(locations).toHaveLength(5);
    expect(Array.isArray(locations)).toBe(true);
  });

  test("all values are within valid range", () => {
    const locations = getRandomLocations();
    locations.forEach((location) => {
      expect(location).toBeGreaterThanOrEqual(0);
      expect(location).toBeLessThan(20);
      expect(Number.isInteger(location)).toBe(true);
    });
  });

  test("returns different values on multiple calls", () => {
    const locations1 = getRandomLocations();
    const locations2 = getRandomLocations();
    const locations3 = getRandomLocations();

    const allSame = locations1.every(
      (val, index) => val === locations2[index] && val === locations3[index]
    );
    expect(allSame).toBe(false);
  });

  test("each call returns valid positions", () => {
    for (let i = 0; i < 10; i++) {
      const locations = getRandomLocations();
      expect(locations).toHaveLength(5);

      locations.forEach((location) => {
        expect(location).toBeGreaterThanOrEqual(0);
        expect(location).toBeLessThan(20);
        expect(Number.isInteger(location)).toBe(true);
      });
    }
  });
});
