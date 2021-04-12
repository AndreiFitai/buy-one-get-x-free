const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const {
  getInputFilePaths,
  parseCSVs,
} = require("../../../src/helpers/fileHelper");
const { orders } = require("../../testData/order");

chai.use(chaiAsPromised);
const { expect } = chai;

const TEST_INPUT_FOLDER_PATH = ["test", "testData", "input"];
const EMPTY_INPUT_FOLDER_PATH = ["test", "testData", "emptyInput"];

const ORDERS_PATH = "test/testData/input/orders.csv";
const NO_ORDERS_PATH = "test/testData/input/noOrder.csv";

describe("fileHelper", () => {
  describe("getInputFilePaths", () => {
    it("returns all absolute paths to input files", async () => {
      const result = await getInputFilePaths(TEST_INPUT_FOLDER_PATH);

      expect(result).to.be.an("array");
      expect(result).to.have.lengthOf(2);
      expect(result[1]).to.contain(ORDERS_PATH);
    });

    it("throws error when no path given", async () => {
      await expect(getInputFilePaths()).to.be.rejectedWith(
        "GetInputFilePaths: No input folder path given"
      );
    });

    it("throws error when no input folder empty", async () => {
      await expect(
        getInputFilePaths(EMPTY_INPUT_FOLDER_PATH)
      ).to.be.rejectedWith("GetInputFilePaths: No input files present");
    });
  });

  describe("getOrdersFromCSVFiles", () => {
    it("returns array of objects from csv file", async () => {
      const result = await parseCSVs([ORDERS_PATH]);

      expect(result).to.be.a("array");
      expect(result).to.have.lengthOf(3);
      expect(result).to.deep.equal(orders);
    });

    it("returns empty array if order file empty", async () => {
      const result = await parseCSVs([NO_ORDERS_PATH]);

      expect(result).to.be.a("array");
      expect(result).to.have.lengthOf(0);
    });

    it("throws an error when no paths are given", async () => {
      await expect(parseCSVs([])).to.be.rejectedWith(
        "GetOrdersFromCSVFiles: No order file paths given"
      );
    });
  });
});
