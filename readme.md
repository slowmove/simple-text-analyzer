Simple Text Analyzer
===

This small package helps you analyze a text, bringing the most valuable words up front to use as for example tags when publishing.
Available as both cli application as well as code library.

**File support:**
- plain text (txt, rtf, md etc)
- pdf
- docx

### Install

Install the cli app by running `npm -g install simple-text-analyzer`.

Install as a library in your app by running `npm install simple-text-analyzer`.

### Usage as CLI application

```
Usage with local file: -f <file>
Usage with external file: -u <url>

Options:
  --help        Show help                                              [boolean]
  --version     Show version number                                    [boolean]
  -f, --file    A local plain text file                                 [string]
  -u, --url     The url to fetch a plain text file from.                [string]
  -i, --ignore  A json file with an array of words to ignore            [string]
```

**Example:** `simple-text-analyzer -f "my-analysis-article.md`

### Usage as code library

```javascript
const simpleTextAnalyzer = require("simple-text-analyzer");

fs.readFile("text.txt", "utf-8", (err, text) => {
  if (err) return;
  const ignoreList = ["ignore", "these", "words"];
  const result = simpleTextAnalyzer.analyze(text, ignoreList);
  // use the result...
});
```

**analyze** This methods takes the text as its first parameter, and optional an ignore list (array) as a second parameter.
Returns an array of objects `{ name, total }`
