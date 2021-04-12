const path = require("path");
const fs = require("fs");
const csv = require("csvtojson");
const { INPUT_FOLDER_PATH } = require("../../config");

async function readCSVFilesAndParse() {
  const filesNames = await fs.readdirSync(
    path.resolve(INPUT_FOLDER_PATH),
    (err, files) => {
      if (err) {
        throw new Error(`GetInputFilePaths: Unable to scan directory: ${err}`);
      }

      return files;
    }
  );

  const filePaths = filesNames.map((file) =>
    path.resolve(INPUT_FOLDER_PATH, file)
  );

  const parsedCSVs = filePaths.map((filePath) => csv().fromFile(filePath));

  const orders = await Promise.all(parsedCSVs);

  return orders.flat();
}

module.exports = { readCSVFilesAndParse };
