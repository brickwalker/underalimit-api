// Project modules
const {
  requestKeys,
  drinkTypes,
  alcRange,
  kgRange,
  genderOptions,
} = require("../config/config.json");

function validateData(data, response) {
  const passedKeys = Object.keys(data);
  response.statusCode = 400;
  if (!validateAll(passedKeys, requestKeys)) {
    return {
      status: "ERROR",
      message: `Required key missing. Passed keys ${passedKeys.toString()}, required keys ${requestKeys.toString()}.`,
    };
  } else if (!validateOne(data.drinkType, drinkTypes)) {
    return {
      status: "ERROR",
      message: `Drink not recognized. Passed drink ${
        data.drinkType
      }, possible options ${drinkTypes.toString()}.`,
    };
  } else if (!validateInRange(data.alcPercent, alcRange.start, alcRange.end)) {
    return {
      status: "ERROR",
      message: `Wrong alcohol percentage. Passed percentage ${data.alcPercent}, required range from ${alcRange.start} to ${alcRange.end}.`,
    };
  } else if (!validateInRange(data.weightKg, kgRange.start, kgRange.end)) {
    return {
      status: "ERROR",
      message: `Wrong weight. Passed ${data.weightKg} kg, required range from ${kgRange.start} kg to ${kgRange.end} kg.`,
    };
  } else if (!validateOne(data.gender, genderOptions)) {
    return {
      status: "ERROR",
      message: `Unrecognized gender entry. Passed entry ${
        data.gender
      }, possible options ${genderOptions.toString()}.`,
    };
  } else if (typeof data.isLearner !== "boolean") {
    return {
      status: "ERROR",
      message: `Unrecognized license type entry. Passed entry ${data.isLearner.toString()}, possible options boolean true or false.`,
    };
  } else {
    response.statusCode = 200;
    return {
      status: "OK",
      message: "Checks successful.",
      drinkType: data.drinkType,
      input: JSON.stringify(data),
    };
  }
}

function validateAll(passedItems, requiredItems) {
  for (let k of requiredItems) {
    if (!passedItems.includes(k)) {
      return false;
    }
  }
  return true;
}

function validateOne(passedItem, requiredItems) {
  if (requiredItems.includes(passedItem)) {
    return true;
  }
  return false;
}

function validateInRange(passedItem, inclusiveStart, inclusiveEnd) {
  if (passedItem >= inclusiveStart && passedItem <= inclusiveEnd) {
    return true;
  }
  return false;
}

module.exports = validateData;
