const randomNumber = require("random-words");
const express = require("express");

const app = express();
/*
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});
*/
app.get("/", (req, res) => {
  res.set("content-type", "application/json");
  const obj = randomNumber(5);
  return res.json(JSON.stringify(obj));
});

app.listen(5000, () => {
  console.log("Running on port 5000.");
});

module.exports = app;
