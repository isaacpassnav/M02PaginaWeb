const {
  getHomeMovies,
  getMovieDetails,
  getMovieTrailer,
  getMovieProviders,
} = require("../services/tmdbService.js");

async function tmdbHomeController(req, res) {
  try {
    const page = Number(req.query.page || 1);
    const movies = await getHomeMovies(page);
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message || "TMDB home request failed" });
  }
}

async function tmdbMovieDetailsController(req, res) {
  try {
    const movie = await getMovieDetails(req.params.id);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message || "TMDB details request failed" });
  }
}

async function tmdbTrailerController(req, res) {
  try {
    const trailer = await getMovieTrailer(req.params.id);
    res.status(200).json(trailer);
  } catch (error) {
    res.status(500).json({ error: error.message || "TMDB trailer request failed" });
  }
}

async function tmdbProvidersController(req, res) {
  try {
    const region = req.query.region || "US";
    const providers = await getMovieProviders(req.params.id, region);
    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({ error: error.message || "TMDB providers request failed" });
  }
}

module.exports = {
  tmdbHomeController,
  tmdbMovieDetailsController,
  tmdbTrailerController,
  tmdbProvidersController,
};
