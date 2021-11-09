// Node modules
const http = require("http");
// Local modules
const { serverPort } = require("../config/config.json");

const data = JSON.stringify({
  drinkType: "pints",
  alcPercent: 5,
  weightKg: 48,
  gender: "female",
  isLearner: true,
  someOtherKey: "someOtherData"
});

const options = {
  hostname: "localhost",
  port: serverPort,
  path: "/portion",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length,
  },
};

const request = http.request(options);

request.on("response", (res) => {
  console.log(`statusCode: ${res.statusCode}`);
  console.log("headers:", res.headers);
  res.on("data", (chunk) => {
    console.log("data:", chunk.toString());
  });
});

request.on("error", (err) => {
  console.error(err);
});

request.end(data);
