const Movie = require("../models/movie.js");

function normalizeMoviePayload(payload) {
  const title = String(payload.title || "").trim();
  const trailerQuery = encodeURIComponent(`${title || "movie"} trailer`);
  const infoQuery = encodeURIComponent(`${title || "movie"} movie info`);

  let genre = payload.genre || [];
  if (typeof genre === "string") {
    genre = genre
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return {
    ...payload,
    title,
    duration: payload.duration ? String(payload.duration) : "N/A",
    genre,
    watchUrl:
      payload.watchUrl ||
      payload.trailerUrl ||
      `https://www.youtube.com/results?search_query=${trailerQuery}`,
    infoUrl:
      payload.infoUrl ||
      payload.imdbUrl ||
      `https://www.google.com/search?q=${infoQuery}`,
  };
}

async function getMoviesService() {
  try {
    const allMovies = await Movie.find();
    return allMovies;
  } catch (error) {
    console.log("Error getting movies:", error);
  }
}

async function newMovieService(movieData) {
  try {
    const normalizedMovie = normalizeMoviePayload(movieData);
    const movie = await Movie.create(normalizedMovie);
    return movie;
  } catch (error) {
    console.log("Error creating movie:", error);
  }
}

module.exports = { getMoviesService, newMovieService };
