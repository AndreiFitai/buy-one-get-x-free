/* eslint-disable camelcase */
const { readCSVFilesAndParse } = require("./src/helpers/fileHelper");
const { logOrders } = require("./src/helpers/logHelper");
const { calculateUnits } = require("./src/helpers/orderHelper");

async function processOrders() {
  const orders = await readCSVFilesAndParse();
  const finalizedOrders = calculateUnits(orders);

  logOrders(finalizedOrders);
}

processOrders();
