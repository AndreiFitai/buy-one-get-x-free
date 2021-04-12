const BONUS_CONFIG = {
  heart: { heart: 1 },
  liver: { lung: 1 },
  lung: { liver: 1, heart: 1 },
};

const BASE_ORDER = { heart: 0, liver: 0, lung: 0 };

const INPUT_FOLDER_PATH = ["input"];

module.exports = { BONUS_CONFIG, BASE_ORDER, INPUT_FOLDER_PATH };
