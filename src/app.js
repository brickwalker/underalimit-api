/* 

(Invoke-WebRequest -Uri 'http://localhost:4141/portion' -Method Post -Body ('{"drinkType": "beer", "alcPercent": 5, "weightKg": 65, "gender": "male", "isLearner": false}' | ConvertTo-Json) -ContentType 'application/json').RawContent
* Receive JSON w/:
- drink type (beer, wine...)
- alc percentage
- body weight kg
- birth gender
- isLearner bool

* Validate each key, and reply back nicely if something not right

* Optional log this request into file level db
* Optional set up logging

* If all good, calculate drinks up to legal limit
! Floor division to be used,for pints to closest half pint

* Return json
- mirror drink type
- for pints different array will include 4 nested arrays, each with object (type (pint to half pint, bottle, third, quarter) and typeresult) 
- maybe standardise same data structure for others, but use only one array element

* Read about 

*/

const http = require("http");
const jsonBody = require("body/json");
const validateData = require("./components/validateData");
const calculateResult = require("./components/calculateResult");

const server = http.createServer();
server.on("request", (request, response) => {
  request.on('error', err => console.log(`Request error code ${err.code}: ${err.message}.`));
  response.on('error', err => {
    console.log(`Response error code ${err.code}: ${err.message}.`)
    response.statusCode = 500;
    response.end("Server side error.");
  });
  jsonBody(request, response, (err, body) => {
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
      let inputData;
      try {
        inputData = JSON.parse(body);
        responseObj = validateData(inputData, response);
        if (responseObj.status === "OK") {
          responseObj.result = calculateResult(inputData);
        }
        response.setHeader("Content-Type", "application/json");
      } catch (error) {
        response.statusCode = 400;
        responseObj.message = `Error occured: ${error.name} ${error.message}.`;
      }
    }
    response.end(JSON.stringify(responseObj));
  });
});

server.listen(4141);
