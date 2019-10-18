const pdfReader = require("pdfreader");

const parsePdf = pdfFilePath => {
  return new Promise((resolve, reject) => {
    let text = "";
    new pdfReader.PdfReader().parseFileItems(pdfFilePath, (err, item) => {
      if (err) {
        reject();
      } else if (item) {
        text += item.text;
      } else if (!item) {
        resolve(text);
      }
    });
  });
};

module.exports = {
  parsePdf
};
