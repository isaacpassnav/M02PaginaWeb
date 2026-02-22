const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../back/.env") });

const app = require("../back/src/server.js");
const conDb = require("../back/src/config/dbCon.js");

const dbInitPromise = conDb().catch((error) => {
  console.error("Database connection failed in serverless runtime:", error.message);
});

function normalizeApiRoute(req) {
  const parsedUrl = new URL(req.url, "http://localhost");
  const route = parsedUrl.searchParams.get("route");

  if (!route) {
    return;
  }

  parsedUrl.searchParams.delete("route");
  const cleanPath = route.startsWith("/") ? route : `/${route}`;
  const queryString = parsedUrl.searchParams.toString();
  req.url = queryString ? `${cleanPath}?${queryString}` : cleanPath;
}

module.exports = async (req, res) => {
  normalizeApiRoute(req);
  await dbInitPromise;
  return app(req, res);
};
