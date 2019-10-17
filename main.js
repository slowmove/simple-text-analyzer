const analyzer = require("./helpers/analyzer");

const analyze = (text, ignoreList = []) => {
  const wordsArray = analyzer.splitByWords(text);
  const wordsMap = analyzer.createWordMap(wordsArray, ignoreList);
  const finalList = analyzer.sortByCount(wordsMap);

  return finalList;
};

module.exports = {
  analyze
};
