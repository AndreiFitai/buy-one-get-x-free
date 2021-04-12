/* eslint-disable camelcase */
const { BASE_ORDER, BONUS_CONFIG } = require("../../config");

function calculateUnits(orders) {
  return orders.map(({ organ, cash, price, bonus_ratio }) => {
    const order = { ...BASE_ORDER };

    const units = Math.floor(cash / price);
    order[organ] = units;

    const bonusItemConfig = BONUS_CONFIG?.[organ];
    const bonusMultiplier = Math.floor(order[organ] / bonus_ratio);
    const bonusItems = Object.keys(bonusItemConfig);

    bonusItems.forEach((bonusItem) => {
      order[bonusItem] += (bonusItemConfig[bonusItem] || 0) * bonusMultiplier;
    });
    return order;
  });
}

module.exports = { calculateUnits };
