/* eslint-disable camelcase */
const bonusConfig = {
  heart: { heart: 1 },
  liver: { lung: 1 },
  lung: { liver: 1, heart: 1 },
};

function calculateUnits(orders) {
  console.log("----- orders ------", orders);
  return orders.map(({ organ, cash, price, bonus_ratio }) => {
    const order = { heart: 0, liver: 0, lung: 0 };

    const units = Math.floor(cash / price);
    order[organ] = units;

    const bonusItemConfig = bonusConfig?.[organ];
    const bonusMultiplier = Math.floor(order[organ] / bonus_ratio);
    const bonusItems = Object.keys(bonusItemConfig);

    bonusItems.forEach((bonusItem) => {
      order[bonusItem] += (bonusItemConfig[bonusItem] || 0) * bonusMultiplier;
    });
    return order;
  });
}

module.exports = { calculateUnits };
