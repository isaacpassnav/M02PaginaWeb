const mongoose = require("mongoose");

const objectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    year: Number,
    director: { type: String, trim: true, maxlength: 80 },
    duration: { type: String, trim: true, maxlength: 24 },
    genre: [String],
    rate: Number,
    poster: String,
    background: String,
    description: { type: String, maxlength: 700 },
    watchUrl: String,
    infoUrl: String,
  },
  {
    timestamps: true,
    strict: "throw",
  }
);

const Movie = mongoose.model("movies", objectSchema);

module.exports = Movie;
