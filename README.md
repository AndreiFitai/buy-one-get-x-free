# buy-one-get-x-free

Requires npm 6.x and nodeJS v14+

# Setup

1. Clone or copy this repo
2. Run `npm i`
3. Run `npm test` or `npm run coverage` to run all tests
4. Run `npm start` or `node index.js`
5. Results will be printed in the console

# About

This project processes csv files found in the input folder and based on the information given it calculates the number of units to sell and what additional items a customer might receive based on the promotion configuration and bonus ratio mentioned in the order.

This project has 3 main parts:

1. Retreiving the files from specified folder and parsing the CSVs into objects
2. Calculate total number of sold items and add bonus items based on the promotion configuration
3. Log to console in a clean way

The CSV files we would use as input should have the following fields :
* organ - The name of the item ordered
* cash - the ammount of money available to purchase specified item
* price - cost of one unit of said item
* bonus_ratio - how many units must be purchased to add N promotional items

The promotional configuration per item can be found in `config.js` as `BONUS_CONFIG`
