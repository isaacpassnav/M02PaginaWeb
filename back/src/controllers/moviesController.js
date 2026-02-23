const { getMoviesService, newMovieService } = require("../services/obtenerPelis.js");

module.exports = {
  moviesController: async (req, res) => {
    try {
      const movies = await getMoviesService();
      res.status(200).json(movies);
    } catch (error) {
      res.status(error.statusCode || 500).json({
        error: error.message || "Failed to load movies.",
      });
    }
  },

  crearMoviesController: async (req, res) => {
    try {
      const movie = await newMovieService(req.body);
      res.status(201).json(movie);
    } catch (error) {
      res.status(error.statusCode || 500).json({
        error: error.message || "Failed to create movie.",
        details: error.details || [],
      });
    }
  },
};
