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

type FilterdSpaceType = {
  word: string;
  spaces: Array<number>;
  isCrossing: boolean;
  startIndex: number;
  endIndex: number;
  found: boolean;
};

export const checkCrossingWords = (
  grid: Array<GridSquareDataType>,
  availableSpaces: Array<any>,
  word: string
) => {
  const wordArray: Array<string> = word.split("");
  const filteredSpaces: Array<FilterdSpaceType> = [];

  availableSpaces.forEach((spaces: Array<number>) => {
    const crossingWords: Array<any> = [];
    let isCrossing = false;
    spaces.forEach((id: number, index: number) => {
      if (grid[id].letter === "") {
        crossingWords.push(id);
      } else if (grid[id].letter === wordArray[index]) {
        isCrossing = true;
        crossingWords.push(id);
      }
    });

    if (crossingWords.length === word.length) {
      filteredSpaces.push({
        word,
        spaces: crossingWords,
        startIndex: crossingWords[0],
        endIndex: crossingWords[crossingWords.length - 1],
        isCrossing,
        found: false,
      });
    }
  });
  return filteredSpaces;
};

const getRandomWords = () => {
  const words = randomWords({ exactly: 100 });
  return words.filter((word) => word.length > 5);
};

export const createWordData = (grid: Array<GridSquareDataType>) => {
  const words: Array<any> = [];

  getRandomWords()
    .slice(0, 40)
    .forEach((word: string) => {
      /////
      const availableWordsAndIDs: any = getSquaresWithEnoughSpaces(
        grid,
        word.length
      );

      if (availableWordsAndIDs) {
        const selectedSpace: FilterdSpaceType = getRandomSelectedIndex(
          checkCrossingWords(grid, availableWordsAndIDs, word)
        );

        if (selectedSpace) {
          selectedSpace.spaces.forEach((id, index) => {
            grid[id].letter = word.charAt(index);
          });
          console.log(selectedSpace);
          words.push(selectedSpace);
        }
      }
    });

  return words;
};

export const getRandomSelectedIndex = (array: Array<any>) => {
  const crossingSpaces = array.filter(
    (item: FilterdSpaceType) => item.isCrossing === true
  );
  if (crossingSpaces.length > 0) {
    array = crossingSpaces;
  }
  const random = Math.floor(Math.random() * array.length);
  if (array[random]) {
    return array[random];
  }
};

export const randomiseGrid = (squares: Array<any>) => {
  squares.forEach((squ) => {
    if (squ.letter === "") squ.letter = getRandomIndex(letters);
  });
};
