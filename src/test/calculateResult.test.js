/* eslint-disable mocha/no-setup-in-describe */
//Node modules
const { expect } = require("chai");
//Project modules
const calculateResult = require("../components/calculateResult");

describe("calculateResult", function () {
  let data;
  const nonPintDrinks = ["wine", "cocktails", "booze"];

  beforeEach(function () {
    data = {
      drinkType: "wine",
      alcPercent: 12.5,
      weightKg: 50,
      gender: "female",
      isLearner: true,
    };
  });

  it("should be an array with 5 elements when pints are chosen", function () {
    data.drinkType = "pints";
    const result = calculateResult(data);

    expect(result).to.be.an("array").that.has.lengthOf(5);
  });

  nonPintDrinks.forEach((el) => {
    it(`should be an array with 2 elements when ${el} is chosen`, function () {
      data.drinkType = el;
      const result = calculateResult(data);

      expect(result).to.be.an("array").that.has.lengthOf(2);
    });
  });
});
