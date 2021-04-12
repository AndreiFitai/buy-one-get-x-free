const path = require("path");
const fs = require("fs");
const csv = require("csvtojson");

async function getInputCSVFilePaths(folderPath) {
  if (!folderPath || !folderPath.length) {
    throw new Error("getInputCSVFilePaths: No input folder path given");
  }

  const inputPath = path.resolve(...folderPath);

  const filesNames = await fs.readdirSync(inputPath, (err, files) => {
    if (err) {
      throw new Error(`getInputCSVFilePaths: Unable to scan directory: ${err}`);
    }

    return files;
  });

  if (!filesNames.length) {
    throw new Error(
      `getInputCSVFilePaths: No input files present in: ${inputPath}`
    );
  }

  const csvFiles = filesNames.filter(
    (fileName) => path.extname(fileName).toLowerCase() === ".csv"
  );

  return csvFiles.map((file) => path.resolve(...folderPath, file));
}

async function parseCSVs(filePaths) {
  if (!filePaths || !filePaths.length) {
    throw new Error("ParseCSVs: No order file paths given");
  }

  const parsedCSVs = filePaths.map((filePath) => csv().fromFile(filePath));

  const orders = await Promise.all(parsedCSVs);

  return orders.flat();
}

module.exports = { getInputCSVFilePaths, parseCSVs };
