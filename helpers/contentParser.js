const pdfReader = require("pdfreader");
const EasyDocx = require("node-easy-docx");

const parsePdf = pdfFilePath => {
  return new Promise((resolve, reject) => {
    let text = "";
    new pdfReader.PdfReader().parseFileItems(pdfFilePath, (err, item) => {
      if (err) {
        reject();
      } else if (item) {
        text += ` ${item.text}`;
      } else if (!item) {
        resolve(text);
      }
    });
  });
};

const parseDocx = async docFilePath => {
  let text = "";
  const easyDocx = new EasyDocx({ path: docFilePath });
  const rowData = await easyDocx.parseDocx();
  rowData.map(r => (text += r.text && r.text.length > 0 ? ` ${r.text}` : ""));
  return text;
};

module.exports = {
  parsePdf,
  parseDocx
};
