// Node modules
const { existsSync, mkdirSync, appendFile } = require("fs");
const {resolve, dirname} = require("path");
// Project modules
const config = require("../config/config");

function logRequest(body) {
  const { enableRequestLogging, requestsLogPath } = config;
  if (!enableRequestLogging) {
    return;
  }

  const fullPath = resolve(requestsLogPath);
  if (!existsSync(fullPath)) {
    const logDirPath = dirname(fullPath);
    if (!existsSync(logDirPath)) {
      try {
        mkdirSync(logDirPath, { recursive: true });
      } catch (error) {
        console.error(`Error creating log directory: ${error}`);
      }
    }
  }

  const entry = `${new Date().toISOString()} ${JSON.stringify(body)}\n`;

  appendFile(
    fullPath,
    entry,
    (err) => err && console.error(`Error appending entry to log: ${err}`)
  );
}

module.exports = logRequest;
