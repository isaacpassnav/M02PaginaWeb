require("dotenv").config();
const mongoose = require("mongoose");

async function conDb() {
    await mongoose.connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ysxusql.mongodb.net/M02?retryWrites=true&w=majority&appName=Cluster0`
    )
}

module.exports = conDb;
