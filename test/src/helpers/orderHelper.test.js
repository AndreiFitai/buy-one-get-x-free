const { expect } = require("chai");
const {
  calculateSaleUnits,
  addBonusItems,
} = require("../../../src/helpers/orderHelper");
const {
  orders,
  processedOrders,
  proccesedOrderNoBase,
  processedOrdersNoBonuses,
  processedOrdersWithExtraItem,
} = require("../../testData/order");

const BONUS_CONFIG = {
  heart: { heart: 1 },
  liver: { lung: 1 },
  lung: { liver: 1, heart: 1 },
};

const BASE_ORDER = new Map([
  ["heart", 0],
  ["liver", 0],
  ["lung", 0],
]);

describe("orderHelper", () => {
  describe("addBonusItems", () => {
    it("adds bonus items to an order", async () => {
      const orderWithoutBonus = processedOrdersNoBonuses[0];
      const item = "liver";
      const bonusRatio = 2;
      const bonusItemConfig = BONUS_CONFIG[item];
      const orderWithBonus = processedOrders[0];

      const result = await addBonusItems(
        orderWithoutBonus,
        item,
        bonusRatio,
        bonusItemConfig
      );

      expect(result).to.be.deep.equal(orderWithBonus);
    });

    it("doesn't add any extra items with 0 bonus ratio", async () => {
      const orderWithoutBonus = processedOrdersNoBonuses[0];
      const item = "liver";
      const bonusItemConfig = BONUS_CONFIG[item];

      const result = await addBonusItems(
        orderWithoutBonus,
        item,
        0,
        bonusItemConfig
      );

      expect(result).to.be.deep.equal(orderWithoutBonus);
    });

    it("doesn't add any extra items without bonus configuration", async () => {
      const orderWithoutBonus = processedOrdersNoBonuses[0];
      const item = "liver";
      const bonusRatio = 2;

      const result = await addBonusItems(orderWithoutBonus, item, bonusRatio);

      expect(result).to.be.deep.equal(orderWithoutBonus);
    });
  });

  describe("calculateSaleUnits", () => {
    it("correctly calculates total items for all orders", async () => {
      const result = await calculateSaleUnits(orders, BASE_ORDER, BONUS_CONFIG);

      expect(result).to.be.deep.equal(processedOrders);
    });

    it("correctly calculates total items for all orders without bonus config ", async () => {
      const result = await calculateSaleUnits(orders, BASE_ORDER);

      expect(result).to.be.deep.equal(processedOrdersNoBonuses);
    });

    it("correctly calculates total items for all orders without base order set", async () => {
      const result = await calculateSaleUnits(orders);

      expect(result).to.be.deep.equal(proccesedOrderNoBase);
    });

    it("correctly calculates orders with item not configured", async () => {
      const extraItem = {
        organ: "eye",
        cash: "15",
        price: "5",
        bonus_ratio: "2",
      };

      const orderWithExtraItem = [...orders, extraItem];
      const result = await calculateSaleUnits(
        orderWithExtraItem,
        BASE_ORDER,
        BONUS_CONFIG
      );

      expect(result).to.have.lengthOf(4);
      expect(result).to.be.deep.equal(processedOrdersWithExtraItem);
    });

    it("throws an error when no orders are provided", async () => {
      expect(() => calculateSaleUnits([])).to.throw(
        "CalculateSaleUnits: No orders to process"
      );
    });
  });
});
