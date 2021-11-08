//Node modules
const { expect } = require("chai");
//Project modules
const validateData = require("../components/validateData");

describe("validateData", function () {
  let response;
  let data;

  beforeEach(function () {
    data = {
        drinkType: "pints",
        alcPercent: 5,
        weightKg: 50,
        gender: "female",
        isLearner: true,
      };
    response = {};
  });

  it("should set statusCode to 400 and return custom object when data does not have all required keys", function () {
    data = {};
    const output = validateData(data, response);

    expect(response.statusCode).to.equal(400);
    expect(output.status).to.equal("ERROR");
    expect(output).to.have.property("message");
  });

  it("should set statusCode to 400 and return custom object when drinkType not defined", function () {
    data.drinkType = "petrol";
    const output = validateData(data, response);

    expect(response.statusCode).to.equal(400);
    expect(output.status).to.equal("ERROR");
    expect(output).to.have.property("message");
  });

  it("should set statusCode to 400 and return custom object when alcPercent outside of range", function () {
    data.alcPercent = 999;
    const output = validateData(data, response);

    expect(response.statusCode).to.equal(400);
    expect(output.status).to.equal("ERROR");
    expect(output).to.have.property("message");
  });

  it("should set statusCode to 400 and return custom object when weightKg outside of range", function () {
    data.weightKg = 10;
    const output = validateData(data, response);

    expect(response.statusCode).to.equal(400);
    expect(output.status).to.equal("ERROR");
    expect(output).to.have.property("message");
  });

  it("should set statusCode to 400 and return custom object when gender not defined", function () {
    data.gender = "alien";
    const output = validateData(data, response);

    expect(response.statusCode).to.equal(400);
    expect(output.status).to.equal("ERROR");
    expect(output).to.have.property("message");
  });

  it("should set statusCode to 400 and return custom object when isLearner not a boolean", function () {
    data.isLearner = "string";
    const output = validateData(data, response);

    expect(response.statusCode).to.equal(400);
    expect(output.status).to.equal("ERROR");
    expect(output).to.have.property("message");
  });

  it("should set statusCode to 200 and return custom object when validation successful", function () {
    const output = validateData(data, response);

    expect(response.statusCode).to.equal(200);
    expect(output).to.have.all.keys("status", "message", "drinkType", "input");
    expect(output.status).to.equal("OK");
  });
});
