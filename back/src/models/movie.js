const mongoose = require("mongoose");

const objectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    year: Number,
    director: String,
    duration: String,
    genre: [String],
    rate: Number,
    poster: String,
    background: String,
    description: String,
    watchUrl: String,
    infoUrl: String,
});

const Movie = mongoose.model("movies", objectSchema);

module.exports = Movie;
