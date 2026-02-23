const express = require("express");
const router = require("./routes/indexRouter.js");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

const allowedOrigins = new Set(
  [
    process.env.FRONTEND_ORIGIN,
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://localhost:5500",
    "http://127.0.0.1:5500",
  ].filter(Boolean)
);

function isAllowedOrigin(origin = "") {
  if (!origin) return true;
  if (allowedOrigins.has(origin)) return true;
  return /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin);
}

server.use(morgan("dev"));
server.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Origin not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
server.use(express.json({ limit: "80kb" }));

server.use(router);

module.exports = server;
