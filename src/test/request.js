const http = require("http");

const data = JSON.stringify({
  drinkType: "pints",
  alcPercent: 5,
  weightKg: 65,
  gender: "male",
  isLearner: false,
});

const options = {
  hostname: "localhost",
  port: 4141, // port to move to config file
  path: "/portion",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length,
  },
};

const request = http.request(options);

request.on('response', (res) => {
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
