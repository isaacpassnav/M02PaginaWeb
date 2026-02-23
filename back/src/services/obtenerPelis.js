const Movie = require("../models/movie.js");

function buildError(message, statusCode = 400, details = []) {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.details = details;
  return error;
}

function sanitizeText(value, maxLength = 160) {
  return String(value || "")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function toHttpUrl(value) {
  const text = String(value || "").trim();
  if (!text) return "";

  try {
    const parsed = new URL(text);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return "";
    }
    return parsed.toString();
  } catch (error) {
    return "";
  }
}

function parseGenre(genreInput) {
  const source = Array.isArray(genreInput) ? genreInput : String(genreInput || "").split(",");
  return source
    .map((item) => sanitizeText(item, 32))
    .filter(Boolean)
    .slice(0, 5);
}

function validateMoviePayload(payload) {
  const details = [];
  const currentYear = new Date().getFullYear();

  const title = sanitizeText(payload.title, 120);
  const director = sanitizeText(payload.director, 80);
  const duration = sanitizeText(payload.duration, 24);
  const description = sanitizeText(payload.description, 700);
  const background = toHttpUrl(payload.background);
  const poster = toHttpUrl(payload.poster);
  const watchUrl = toHttpUrl(payload.watchUrl || payload.trailerUrl);
  const infoUrl = toHttpUrl(payload.infoUrl || payload.imdbUrl);
  const genre = parseGenre(payload.genre);
  const year = Number(payload.year);
  const rate = Math.round(Number(payload.rate) * 10) / 10;

  if (String(payload.website || "").trim().length > 0) {
    throw buildError("Spam validation failed.", 400);
  }

  if (title.length < 2) details.push("Title must contain at least 2 characters.");
  if (!Number.isInteger(year) || year < 1888 || year > currentYear + 2) {
    details.push("Year is out of allowed range.");
  }
  if (director.length < 2) details.push("Director must contain at least 2 characters.");
  if (duration.length < 2) details.push("Duration is required.");
  if (!genre.length) details.push("At least one valid genre is required.");
  if (!Number.isFinite(rate) || rate < 0 || rate > 10) details.push("Rate must be between 0 and 10.");
  if (!poster) details.push("Poster must be a valid HTTP/HTTPS URL.");
  if (payload.watchUrl && !watchUrl) details.push("Watch URL must be a valid HTTP/HTTPS URL.");
  if (payload.infoUrl && !infoUrl) details.push("Info URL must be a valid HTTP/HTTPS URL.");

  if (details.length) {
    throw buildError("Invalid movie payload.", 400, details);
  }

  const trailerQuery = encodeURIComponent(`${title} trailer`);
  const infoQuery = encodeURIComponent(`${title} movie info`);

  return {
    title,
    year,
    director,
    duration,
    genre,
    rate,
    poster,
    background,
    description: description || "No description available.",
    watchUrl: watchUrl || `https://www.youtube.com/results?search_query=${trailerQuery}`,
    infoUrl: infoUrl || `https://www.google.com/search?q=${infoQuery}`,
  };
}

async function getMoviesService() {
  try {
    return await Movie.find().sort({ createdAt: -1 });
  } catch (error) {
    throw buildError("Could not load movies.", 500);
  }
}

async function newMovieService(movieData) {
  const normalizedMovie = validateMoviePayload(movieData);

  try {
    const existingMovie = await Movie.findOne({
      title: normalizedMovie.title,
      year: normalizedMovie.year,
    });

    if (existingMovie) {
      throw buildError("Movie already exists for this title and year.", 409);
    }

    return await Movie.create(normalizedMovie);
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    throw buildError("Could not create movie.", 500);
  }
}

module.exports = { getMoviesService, newMovieService };
