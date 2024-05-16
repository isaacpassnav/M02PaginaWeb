const mongoose = require("mongoose");

const objectSchema = new mongoose.Schema({
    title: String,
    year: Number,
    director: String,
    duration: Number,
    gender: String,
    rate: Number,
    poster: String,
});

const Movie = mongoose.model("movies", objectSchema);

module.exports = Movie;
