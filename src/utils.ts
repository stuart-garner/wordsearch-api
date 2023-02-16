export const letters: Array<string> = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

export const getRandomIndex = (array: Array<any>) => {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
};

export const getAvailableSquareIds = (
  index: number,
  length: number,
  multiplier: number
) =>
  Array(length)
    .fill(0)
    .map(() => {
      const result: number = index;
      index += multiplier;
      return result;
    });
