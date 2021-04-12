/* eslint-disable camelcase */
const { getInputFilePaths, parseCSVs } = require("./helpers/fileHelper");
const { logOrders } = require("./helpers/logHelper");
const { calculateSaleUnits } = require("./helpers/orderHelper");
const { INPUT_FOLDER_PATH, BASE_ORDER, BONUS_CONFIG } = require("../config");

async function processOrders() {
  const filePaths = await getInputFilePaths(INPUT_FOLDER_PATH);
  const allOrders = await parseCSVs(filePaths);
  const finalizedOrders = calculateSaleUnits(
    allOrders,
    BASE_ORDER,
    BONUS_CONFIG
  );

  logOrders(finalizedOrders);
}

module.exports = { processOrders };
