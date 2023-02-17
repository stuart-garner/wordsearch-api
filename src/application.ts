import express from "express";
import cors from "cors";
import { createGridData, createWordData, GridSquareDataType } from "./grid";
import { getRandomIndex, letters } from "./utils";

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

const initAPI = (numberOfcolumns: number | string = 6) => {
  const gridData: Array<GridSquareDataType> = createGridData(
    Number(numberOfcolumns)
  );
  const words: Array<any> = createWordData(gridData);

  const gridToRender: Array<GridSquareType> = gridData.map(
    (item: GridSquareDataType) => {
      return {
        id: item.id,
        letter: item.letter === "" ? getRandomIndex(letters) : item.letter,
      };
    }
  );

  return { grid: gridToRender, words };
};

const app = express();
app.use(cors());

app.get("/api/grid/:size", (req, res) => {
  res.send(JSON.stringify(initAPI(req.params.size)));
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  //console.log(`Running on port ${port}`);
});
