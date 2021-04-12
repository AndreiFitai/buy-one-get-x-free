/* eslint-disable camelcase */
/* eslint-disable camelcase */

function addBonusItems(order, item, bonusRatio, bonusItemConfig) {
  if (!bonusRatio || !bonusItemConfig) {
    return order;
  }

  const orderWithBonus = { ...order };
  const bonusMultiplier = Math.floor(order[item] / bonusRatio);
  const bonusItems = Object.keys(bonusItemConfig);

  bonusItems.forEach((bonusItem) => {
    orderWithBonus[bonusItem] +=
      (bonusItemConfig[bonusItem] || 0) * bonusMultiplier;
  });

  return orderWithBonus;
}

function calculateSaleUnits(orders, baseOrderConfig = [], bonusConfig) {
  if (!orders.length) {
    throw new Error("CalculateSaleUnits: No orders to process");
  }

  return orders.map(({ organ, cash, price, bonus_ratio }) => {
    const baseOrder = { ...baseOrderConfig };

    const units = Math.floor(cash / price);
    baseOrder[organ] = units;

    if (bonusConfig?.[organ] && bonus_ratio) {
      return addBonusItems(baseOrder, organ, bonus_ratio, bonusConfig?.[organ]);
    }

    return baseOrder;
  });
}

module.exports = { calculateSaleUnits, addBonusItems };
