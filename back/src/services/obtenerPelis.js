
const Movie = require("../models/movie.js");


async function getMoviesService() {
    try {
        const todasLasPeliculas = await Movie.find();
        return todasLasPeliculas;
    } catch (error) {
        console.log("Error al obtener las películas:", error);
    }
};

async function newMovieService(movieObjeto) {
    try {
        const movie = await Movie.create(movieObjeto);
        return movie;
    } catch (error) {
        console.log("Error al crear la película:", error);
    }
}

module.exports = { getMoviesService, newMovieService };
