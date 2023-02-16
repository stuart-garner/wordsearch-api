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

const app = express();

app.get("/api/grid", (req, res) => {
  res.send(JSON.stringify(gridToRender));
});

app.get("/api/words", (req, res) => {
  res.send(JSON.stringify(words));
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
