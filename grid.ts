import { getRandomIndex, letters, getAvailableSquareIds } from "./utils";
import randomWords from "random-words";

export type GridSquareDataType = {
  id: number;
  availableSquares: Array<any>;
  letter: string;
};

export const createGridData = (gridSize: number) => {
  let cols: number = 0;
  let rows: number = 0;

  const flatArray: Array<any> = Array(gridSize * gridSize)
    .fill({})
    .map((item: number, index: number) => {
      let diagonalDown: number = 0;
      if (cols <= rows) {
        diagonalDown = gridSize - rows;
      } else if (cols > rows) {
        diagonalDown = gridSize - cols;
      }

      let diagonalUp: number = 0;
      if (gridSize - cols <= rows) {
        diagonalUp = gridSize - cols;
      } else if (gridSize - cols > rows) {
        diagonalUp = rows + 1;
      }
      const squareData: GridSquareDataType = {
        id: index,
        availableSquares: [
          getAvailableSquareIds(index, gridSize - cols, 1),
          getAvailableSquareIds(index, rows + 1, 0 - gridSize),
          getAvailableSquareIds(index, gridSize - rows, gridSize),
          getAvailableSquareIds(index, diagonalDown, gridSize + 1),
          getAvailableSquareIds(index, diagonalUp, 1 - gridSize),
        ],
        letter: "",
      };
      cols++;
      if (cols >= gridSize) {
        cols = 0;
        rows++;
      }
      return squareData;
    });
  return flatArray;
};

export const getSquaresWithEnoughSpaces = (
  grid: Array<GridSquareDataType>,
  wordLength: number
) => {
  const result: Array<any> = [];
  grid.forEach((square: GridSquareDataType) => {
    square.availableSquares.forEach((array: Array<number>) => {
      if (array.length === wordLength) {
        result.push(array);
      }
    });
  });
  return result;
};

export const checkCrossingWords = (
  grid: Array<GridSquareDataType>,
  availableSpaces: Array<any>,
  word: string
) => {
  const wordArray: Array<string> = word.split("");
  const filteredSpaces: Array<any> = [];
  availableSpaces.forEach((spaces: Array<number>) => {
    const test: Array<number> = [];
    spaces.forEach((id: number, index: number) => {
      if (grid[id].letter === "" || grid[id].letter === wordArray[index]) {
        test.push(id);
      }
    });
    if (test.length === word.length) filteredSpaces.push(test);
  });
  return filteredSpaces;
};

export const createWordData = (grid: Array<GridSquareDataType>) => {
  const words: Array<any> = [];
  randomWords(Math.sqrt(grid.length)).forEach((word: string) => {
    const availableWordsAndIDs: any = getSquaresWithEnoughSpaces(
      grid,
      word.length
    );

    if (availableWordsAndIDs) {
      const selectedSpace: Array<number> = getRandomIndex(
        checkCrossingWords(grid, availableWordsAndIDs, word)
      );

      selectedSpace.forEach((id, index) => {
        grid[id].letter = word.charAt(index);
      });

      words.push({ word, selectedSpace, found: false });
    }
  });
  return words;
};

export const randomiseGrid = (squares: Array<any>) => {
  squares.forEach((squ) => {
    if (squ.letter === "") squ.letter = getRandomIndex(letters);
  });
};
