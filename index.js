const randomNumber = require("random-words");
const express = require("express");

const app = express();
/*
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});
*/
app.get("/api/v1/random-number", (req, res) => {
  res.set("content-type", "application/json");
  const obj = randomNumber(req.query.number);
  return res.send(JSON.stringify(obj));
});

app.listen(5000, () => {
  console.log("Running on port 5000.");
});

module.exports = app;
