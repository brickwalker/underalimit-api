// Project modules
const { drinkSize } = require("../config/config.json");

function calculateResult(data) {
  const maxLitres = calculateLitres(data);
  const results = [{ drinkSize: "litre", portions: maxLitres }];
  if (data.drinkType === "pints") {
    results.push({
      drinkSize: "pint",
      portions: calculatePortion(maxLitres, drinkSize.pint, 0.5),
    });
    results.push({
      drinkSize: "bottle",
      portions: calculatePortion(maxLitres, drinkSize.bottle),
    });
    results.push({
      drinkSize: "smallBottle",
      portions: calculatePortion(maxLitres, drinkSize.smallBottle),
    });
    results.push({
      drinkSize: "smallCan",
      portions: calculatePortion(maxLitres, drinkSize.smallCan),
    });
  } else if (data.drinkType === "wine") {
    results.push({
      drinkSize: "wineGlass",
      portions: calculatePortion(maxLitres, drinkSize.wineGlass),
    });
  } else if (data.drinkType === "cocktails") {
    results.push({
      drinkSize: "coctailGlass",
      portions: calculatePortion(maxLitres, drinkSize.coctailGlass),
    });
  } else if (data.drinkType === "booze") {
    results.push({
      drinkSize: "shot",
      portions: calculatePortion(maxLitres, drinkSize.shot),
    });
  }
  return results;
}

function calculateLitres(data) {
  const { alcPercent, weightKg, gender, isLearner } = data;
  const maxBacMg = isLearner ? 20 : 50;
  const metabolicRate = gender === "female" ? 0.017 : 0.015;
  const waterRatio = gender === "male" ? 0.68 : 0.55;
  const litresToKgRate = 0.789;
  const bloodDensity = 1.055;
  const maxLitres = [];
  for (let timeHr = 0; timeHr <= 24; timeHr++) {
    let portionL =
      ((maxBacMg / 1000 + metabolicRate * timeHr) * waterRatio * weightKg) /
      (bloodDensity * litresToKgRate * alcPercent);
    portionL = portionL.toFixed(2);
    portionL = Number.parseFloat(portionL);
    maxLitres.push(portionL);
  }
  return maxLitres;
}

function calculatePortion(maxLitres, drinkSize, factor = 1) {
  const portions = maxLitres.map((x) => {
    const portionRaw = x / drinkSize;
    const portionRounded = Math.floor(portionRaw / factor) * factor;
    return portionRounded;
  });
  return portions;
}

module.exports = calculateResult;
