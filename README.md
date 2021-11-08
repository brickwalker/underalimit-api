# underalimit-api
Drinks calculator for safe driving

## Quick setup
```javascript
/* To start server
Exposes endpoint http://hostname:4141/portion
Port can be changed in config.json
*/
npm install
npm start
/* To send simulation request
POST stringified JSON with following keyes
{"drinkType":"pints","alcPercent":5,"weightKg":65,"gender":"male","isLearner":false}
Keys and accepted values can be changed in config.json
*/
npm run sim:req
// To run tests
npm test
```

## Basic functionality
- Receives client request
- Validates data
- Optionally logs request
- Calculates servings
- Returns results

## Source data
**Legal limits** in Ireland taken from [RSA site](https://www.rsa.ie/):
* 20 milligrammes of alcohol per 100ml of blood for learner and novice drivers;
* 50 milligrammes of alcohol per 100ml of blood.

**Blood alcohol content** calculations are based on this [Wikipedia article](https://en.wikipedia.org/wiki/Blood_alcohol_content):
```
portionL = ((maxBacMg / 1000 + metabolicRate * timeHr) * waterRatio * weightKg) / (bloodDensity * litresToKgRate * alcPercent)
```
