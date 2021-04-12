const { expect } = require("chai");
const { stdout } = require("test-console");
const { logOrders } = require("../../../src/helpers/logHelper");

const orders = [
  { heart: 0, liver: 2, lung: 1 },
  { heart: 4, liver: 0, lung: 0 },
  { heart: 2, liver: 2, lung: 8 },
];

describe("logHelper", () => {
  describe("logOrders", () => {
    it("log all orders to console", () => {
      const output = stdout.inspectSync(() => {
        logOrders(orders);
      });
      expect(output).to.be.deep.equal([
        "heart 0, liver 2, lung 1\n",
        "heart 4, liver 0, lung 0\n",
        "heart 2, liver 2, lung 8\n",
      ]);
    });
  });
});
