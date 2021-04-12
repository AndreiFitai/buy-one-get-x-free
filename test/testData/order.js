const orders = [
  { organ: "liver", cash: "10", price: "5", bonus_ratio: "2" },
  { organ: "heart", cash: "10", price: "3", bonus_ratio: "3" },
  { organ: "lung", cash: "25", price: "3", bonus_ratio: "4" },
];

const processedOrders = [
  { heart: 0, liver: 2, lung: 1 },
  { heart: 4, liver: 0, lung: 0 },
  { heart: 2, liver: 2, lung: 8 },
];

const processedOrdersNoBonuses = [
  { heart: 0, liver: 2, lung: 0 },
  { heart: 3, liver: 0, lung: 0 },
  { heart: 0, liver: 0, lung: 8 },
];

const processedOrdersWithExtraItem = [
  { heart: 0, liver: 2, lung: 1 },
  { heart: 4, liver: 0, lung: 0 },
  { heart: 2, liver: 2, lung: 8 },
  { heart: 0, liver: 0, lung: 0, eye: 3 },
];

const proccesedOrderNoBase = [{ liver: 2 }, { heart: 3 }, { lung: 8 }];

const orderWithoutPredifinedOrgan = [{ eye: 3, heart: 0, liver: 0, lung: 0 }];

module.exports = {
  orders,
  processedOrders,
  proccesedOrderNoBase,
  processedOrdersNoBonuses,
  orderWithoutPredifinedOrgan,
  processedOrdersWithExtraItem,
};
