const path = require("path");
const fs = require("fs");
const csv = require("csvtojson");

async function readCSVFilesAndParse() {
  const filesNames = await fs.readdirSync(
    path.resolve("input"),
    (err, files) => {
      if (err) {
        throw new Error(`GetInputFilePaths: Unable to scan directory: ${err}`);
      }

      return files;
    }
  );

  const filePaths = filesNames.map((file) => path.resolve("input", file));

  const parsedCSVs = filePaths.map((filePath) => csv().fromFile(filePath));

  const orders = await Promise.all(parsedCSVs);

  return orders.flat();
}

module.exports = { readCSVFilesAndParse };
