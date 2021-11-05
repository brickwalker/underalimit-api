// Node modules
const http = require("http");
const jsonBody = require("body/json");
// Project modules
const logRequest = require("./components/logRequest");
const validateData = require("./components/validateData");
const calculateResult = require("./components/calculateResult");
const { serverPort } = require("./config/config.json");

const server = http.createServer();
server.on("request", (request, response) => {
  request.on("error", (err) =>
    console.log(`Request error code ${err.code}: ${err.message}.`)
  );
  response.on("error", (err) => {
    console.log(`Response error code ${err.code}: ${err.message}.`);
    response.statusCode = 500;
    response.end("Server side error.");
  });
  jsonBody(request, response, (err, body) => {
    logRequest(body);
    response.setHeader("X-Powered-By", "Node");
    let responseObj = {};
    responseObj.status = "ERROR";
    if (request.method !== "POST") {
      response.statusCode = 405;
      responseObj.message = `Unsupported method: POST required, ${request.method} used.`;
    } else if (request.url !== "/portion") {
      response.statusCode = 404;
      responseObj.message = `Incorrect endpoint: /portion required, ${request.url} used.`;
    } else if (err) {
      responseObj.message = `Body parsing issue: ${JSON.stringify(err)}.`;
    } else {
      try {
        if (typeof body !== "object" && !Array.isArray(body) && body !== null) {
          throw "Passed data is not JSON";
        }
        responseObj = validateData(body, response);
        if (responseObj.status === "OK") {
          responseObj.result = calculateResult(body);
        }
        response.setHeader("Content-Type", "application/json");
      } catch (error) {
        response.statusCode = 400;
        responseObj.message = `Error occured: ${error}.`;
      }
    }
    response.end(JSON.stringify(responseObj));
  });
});

server.listen(serverPort);
