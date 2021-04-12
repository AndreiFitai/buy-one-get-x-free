/* eslint-disable camelcase */
const { BASE_ORDER, BONUS_CONFIG } = require("../../config");

function addBonusItems(order, item, bonusRatio, bonusItemConfig) {
  const orderWithBonus = { ...order };

  const bonusMultiplier = Math.floor(order[item] / bonusRatio);
  const bonusItems = Object.keys(bonusItemConfig);
  bonusItems.forEach((bonusItem) => {
    orderWithBonus[bonusItem] +=
      (bonusItemConfig[bonusItem] || 0) * bonusMultiplier;
  });
  return orderWithBonus;
}

function calculateSaleUnits(orders) {
  return orders.map(({ organ, cash, price, bonus_ratio }) => {
    const order = { ...BASE_ORDER };

    const units = Math.floor(cash / price);
    order[organ] = units;

    if (BONUS_CONFIG?.[organ] && bonus_ratio) {
      return addBonusItems(order, organ, bonus_ratio, BONUS_CONFIG?.[organ]);
    }

    return order;
  });
}

module.exports = { calculateSaleUnits };
