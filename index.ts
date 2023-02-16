import express from "express";
import { createGridData, createWordData, GridSquareDataType } from "./grid";

export type SquareType = {
  id: number;
  horizontal: number;
  vertical: number;
  diagonal: number;
  letter: string;
};

export type GridSquareType = {
  id: number;
  letter: string;
};

export type ResultType = {
  word: string;
  ids: Array<number>;
  found: boolean;
};

const numberOfcolumns = 6;
const gridData: Array<GridSquareDataType> = createGridData(numberOfcolumns);
const words: Array<any> = createWordData(gridData);

const gridToRender: Array<GridSquareType> = gridData.map(
  (item: GridSquareDataType) => {
    return { id: item.id, letter: item.letter };
  }
);

console.log(gridData);
console.log(gridToRender);
console.log(words);

const app = express();

app.get("/api/v1/grid", (req, res) => {
  res.send(JSON.stringify(gridToRender));
});

app.get("/api/v1/results", (req, res) => {
  res.send(JSON.stringify(words));
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

module.exports = app;
