const { Router } = require("express");
const { crearMoviesController } = require("../controllers/moviesController.js");

const postRouter = Router();

postRouter.post("/", crearMoviesController);

module.exports = postRouter;
