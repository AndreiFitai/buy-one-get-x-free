/* eslint-disable camelcase */
const { getFilePaths, getOrdersFromCSVs } = require("./helpers/fileHelper");
const { logOrders } = require("./helpers/logHelper");
const { calculateSaleUnits } = require("./helpers/orderHelper");

async function processOrders() {
  const filePaths = await getFilePaths();
  const allOrders = await getOrdersFromCSVs(filePaths);
  const finalizedOrders = calculateSaleUnits(allOrders);

  logOrders(finalizedOrders);
}

module.exports = { processOrders };
