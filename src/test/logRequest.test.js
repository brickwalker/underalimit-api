// Node modules
const proxyquire = require("proxyquire");
const { expect } = require("chai");
const sinon = require("sinon");
const fs = require("fs");
const { resolve } = require("path");
// Project modules
const { requestsLogPath } = require("../config/config.json");

describe("logRequest", function () {
  it("should return false if enableRequestLogging false", function () {
    const testConfig = { enableRequestLogging: false };
    const logRequest = proxyquire("../components/logRequest", {
      "../config/config.json": testConfig,
    });

    expect(logRequest({})).to.be.false;
  });

  it("should call appendFile once with requestsLogPath", function () {
    const appendStub = sinon.stub(fs, "appendFile");
    const logRequest = proxyquire("../components/logRequest", { fs });
    logRequest({});
    const fullPath = resolve(requestsLogPath);

    expect(appendStub.callCount).to.equal(1);
    expect(appendStub.getCall(0).args[0]).to.equal(fullPath);
  });
});
