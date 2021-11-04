/* 

Invoke-WebRequest -Uri 'http://localhost:4141/portion' -Method Post -Body ('{"drinkType": "beer", "alcPercent": 5, "weightKg": 65, "gender": "male", "isLearner": false}' | ConvertTo-Json) -ContentType 'application/json'
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
  jsonBody(request, response, (err, body) => {
    let responseObj = {};
    responseObj.status = "ERROR";
    if (request.method !== "POST") {
      responseObj.message = `Unsupported method: POST required, ${request.method} used.`;
    } else if (request.url !== "/portion") {
      responseObj.message = `Incorrect endpoint: /portion required, ${request.url} used.`;
    } else if (err) {
      responseObj.message = `Body parsing issue: ${JSON.stringify(err)}.`;
    } else {
      const inputData = JSON.parse(body);
      responseObj = validateData(inputData);
      if (responseObj.status === "OK") {
        responseObj.result = calculateResult(inputData);
      }
    }
    console.log(responseObj); // check object while developing  
    response.end(JSON.stringify(responseObj));
  });
});

server.listen(4141);
