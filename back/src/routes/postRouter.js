const { Router } = require("express");
const { crearMoviesController } = require("../controllers/moviesController.js");
const { movieCreateLimiter } = require("../middlewares/rateLimiter.js");

const postRouter = Router();

postRouter.post("/", movieCreateLimiter, crearMoviesController);

module.exports = postRouter;
