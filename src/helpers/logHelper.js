/* eslint-disable no-console */

function logOrders(orders) {
  orders.forEach((saleItems) => {
    const mapStrings = Object.keys(saleItems).map(
      (item) => `${item} ${saleItems[item]}`
    );

    console.log(mapStrings.join(", "));
  });
}

module.exports = { logOrders };
