/* eslint-disable camelcase */
const { readCSVFilesAndParse } = require("./helpers/fileHelper");
const { logOrders } = require("./helpers/logHelper");
const { calculateUnits } = require("./helpers/orderHelper");

async function processOrders() {
  const orders = await readCSVFilesAndParse();
  const finalizedOrders = calculateUnits(orders);

  logOrders(finalizedOrders);
}

module.exports = { processOrders };
