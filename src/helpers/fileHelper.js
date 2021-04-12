const path = require("path");
const fs = require("fs");
const csv = require("csvtojson");
const { INPUT_FOLDER_PATH } = require("../../config");

async function getFilePaths() {
  const inputPath = path.resolve(INPUT_FOLDER_PATH);

  const filesNames = await fs.readdirSync(inputPath, (err, files) => files);

  return filesNames.map((file) => path.resolve(INPUT_FOLDER_PATH, file));
}

async function getOrdersFromCSVs(filePaths) {
  const parsedCSVs = filePaths.map((filePath) => csv().fromFile(filePath));

  const orders = await Promise.all(parsedCSVs);

  return orders.flat();
}

module.exports = { getFilePaths, getOrdersFromCSVs };
