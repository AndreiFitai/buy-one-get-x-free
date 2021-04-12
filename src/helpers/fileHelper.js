const path = require("path");
const fs = require("fs");
const csv = require("csvtojson");

async function getInputFilePaths(folderPath) {
  if (!folderPath || !folderPath.length) {
    throw new Error("GetInputFilePaths: No input folder path given");
  }

  const inputPath = path.resolve(...folderPath);

  const filesNames = await fs.readdirSync(inputPath, (err, files) => {
    if (err) {
      throw new Error(`GetInputFilePaths: Unable to scan directory: ${err}`);
    }

    return files;
  });

  if (!filesNames.length) {
    throw new Error("GetInputFilePaths: No input files present");
  }

  return filesNames.map((file) => path.resolve(...folderPath, file));
}

async function parseCSVs(filePaths) {
  if (!filePaths || !filePaths.length) {
    throw new Error("ParseCSVs: No order file paths given");
  }

  const parsedCSVs = filePaths.map((filePath) => csv().fromFile(filePath));

  const orders = await Promise.all(parsedCSVs);

  return orders.flat();
}

module.exports = { getInputFilePaths, parseCSVs };
