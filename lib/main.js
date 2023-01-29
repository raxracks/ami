const express = require("express");
const app = express();
const { parse, resolve } = require("path");
const { walk } = require("./walkDir");
const { parseHTML } = require("./parse");
const { readFileSync } = require("fs");

app.use(express.static("assets"));

let dynamics = [];

walk("src").forEach((file) => {
  if (file.includes("[") && file.includes("]")) return dynamics.push(file);
  register(file);
});

dynamics.forEach((file) => register(file));

function register(file) {
  app.get(parse(file).dir.slice(3).replaceAll("[", ":").replaceAll("]", ""), async (req, res) => {
    res.send(await parseHTML(readFileSync(file).toString(), req));
  });
}

app.get("*", (req, res) => {
  res.send("404");
});

app.listen(8080, () => {
  console.log("Running at http://localhost:8080/");
});
