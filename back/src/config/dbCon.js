require("dotenv").config();
const mongoose = require("mongoose");

let connectionPromise = null;

function getMongoUri() {
  if (process.env.MONGODB_URI) {
    return process.env.MONGODB_URI;
  }

  if (!process.env.DB_USER || !process.env.DB_PASSWORD) {
    throw new Error("Missing MongoDB credentials. Set MONGODB_URI or DB_USER/DB_PASSWORD.");
  }

  return `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ysxusql.mongodb.net/M02?retryWrites=true&w=majority&appName=Cluster0`;
}

async function conDb() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(getMongoUri(), {
      serverSelectionTimeoutMS: 7000,
    });
  }

  await connectionPromise;
  return mongoose.connection;
}

module.exports = conDb;
