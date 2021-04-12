const path = require("path");
const fs = require("fs");
const csv = require("csvtojson");

const bonusConfig = {
  heart: { heart: 1 },
  liver: { lung: 1 },
  lung: { liver: 1, heart: 1 },
};

async function processOrders() {
  const filesNames = await fs.readdirSync(
    path.resolve("input"),
    (err, files) => {
      if (err) {
        throw new Error(`GetInputFilePaths: Unable to scan directory: ${err}`);
      }

      return files;
    }
  );

  const filePaths = filesNames.map((file) => path.resolve("input", file));

  const parsedCSVs = filePaths.map((filePath) => csv().fromFile(filePath));

  const orders = await Promise.all(parsedCSVs);

  const allOrders = orders.flat();

  const processedOrders = allOrders.map(
    ({ organ, cash, price, bonus_ratio }) => {
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
    }
  );

  processedOrders.forEach((saleItems) => {
    const mapStrings = Object.keys(saleItems).map(
      (item) => `${item} ${saleItems[item]}`
    );

    // eslint-disable-next-line no-console
    console.log(mapStrings.join(", "));
  });
}

processOrders();
