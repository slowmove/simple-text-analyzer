#!/usr/bin/env node
const fs = require("fs");
const yargs = require("yargs");

const http = require("./helpers/http");
const analyzer = require("./helpers/analyzer");

const options = yargs
  .usage("Usage with local file: -f <file>")
  .usage("Usage with external file: -u <url>")
  .option("f", {
    alias: "file",
    describe: "A local plain text file",
    type: "string",
    demandOption: false
  })
  .option("u", {
    alias: "url",
    describe: "The url to fetch a plain text file from.",
    type: "string",
    demandOption: false
  })
  .option("i", {
    alias: "ignore",
    describe: "A json file with an array of words to ignore",
    type: "string",
    demandOption: false
  })
  .conflicts("f", "u").argv;

const filePath = options.file;
const url = options.url;
const ignoreFilePath = options.ignore;

(async function() {
  if (!filePath && !url) return;
  const file = filePath
    ? fs.readFileSync(filePath, "utf-8")
    : await http.get(url);

  let wordsToIgnore = [];
  if (ignoreFilePath) {
    wordsToIgnore = fs.readFileSync(ignoreFilePath, "utf-8");
  }

  const wordsArray = analyzer.splitByWords(file);
  const wordsMap = analyzer.createWordMap(wordsArray, wordsToIgnore);
  const finalList = analyzer.sortByCount(wordsMap);

  console.log(finalList);
})();
