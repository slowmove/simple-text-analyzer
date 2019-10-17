const splitByWords = text => {
  var wordsArray = text.split(/\s+/);
  return wordsArray;
};

const createWordMap = (wordsArray, ignoreList) => {
  const wordsMap = {};
  wordsArray.forEach(key => {
    key = key
      .trim()
      .toLowerCase()
      .replace(".", "")
      .replace(",", "")
      .replace("!", "");
    if (key.length <= 5) return;
    if (ignoreList.includes(key)) return;
    // eslint-disable-next-line no-prototype-builtins
    if (wordsMap.hasOwnProperty(key)) {
      wordsMap[key]++;
    } else {
      wordsMap[key] = 1;
    }
  });
  return wordsMap;
};

const sortByCount = wordsMap => {
  var finalWordsArray = [];
  finalWordsArray = Object.keys(wordsMap).map(key => {
    return {
      name: key,
      total: wordsMap[key]
    };
  });
  finalWordsArray.sort((a, b) => b.total - a.total);
  return finalWordsArray.filter(wordObject => wordObject.total > 2);
};

module.exports = {
  splitByWords,
  createWordMap,
  sortByCount
};
