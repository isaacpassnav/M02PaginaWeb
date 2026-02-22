const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../back/.env") });

const app = require("../back/src/server.js");
const conDb = require("../back/src/config/dbCon.js");

const dbInitPromise = conDb().catch((error) => {
  console.error("Database connection failed in serverless runtime:", error.message);
});

module.exports = async (req, res) => {
  await dbInitPromise;
  return app(req, res);
};
