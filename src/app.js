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
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "content-type");
    let responseObj = {};
    responseObj.status = "ERROR";
    if (request.method === "OPTIONS") {
      response.statusCode = 200;
    } else if (request.method !== "POST") {
      response.statusCode = 405;
      responseObj.message = `Unsupported method: POST required, ${request.method} used.`;
    } else if (request.url !== "/portion") {
      response.statusCode = 404;
      responseObj.message = `Incorrect endpoint: /portion required, ${request.url} used.`;
    } else if (err) {
      response.statusCode = 500;
      responseObj.message = `Body parsing issue: ${err}.`;
    } else if (typeof body !== "object") {
      response.statusCode = 400;
      responseObj.message = `Request does not contain valid JSON: ${body}.`;
    } else {
      responseObj = validateData(body, response);
      if (responseObj.status === "OK") {
        responseObj.result = calculateResult(body);
      }
      response.setHeader("Content-Type", "application/json");
    }
    response.end(JSON.stringify(responseObj));
  });
});

server.listen(serverPort);
