
const { getMoviesService, newMovieService } = require("../services/obtenerPelis.js");

module.exports = {
    moviesController: async (req, res) => {
        try {
            const todasLasPeliculas = await getMoviesService();
            res.status(200).json(todasLasPeliculas);
        } catch (err) {
            res.status(500).json({ error: "Error al buscar las películas" });
        }
    },
    crearMoviesController: async (req, res) => {
        const bodyHtml = req.body;
        try {
            const movie = await newMovieService(bodyHtml);
            res.status(201).json(movie);
        } catch (error) {
            res.status(500).json({ error: "Error al crear la película" });
        }
    }
};
