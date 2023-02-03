const randomNumber = require("random-words");
const express = require("express");

const app = express();
/*
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});
*/
app.get("/", (req, res) => {
  res.send(`Random ${randomNumber(5)}`);
});

app.listen(5000, () => {
  console.log("Running on port 5000.");
});

module.exports = app;
