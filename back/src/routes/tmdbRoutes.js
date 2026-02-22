const { Router } = require("express");
const {
  tmdbHomeController,
  tmdbMovieDetailsController,
  tmdbTrailerController,
  tmdbProvidersController,
} = require("../controllers/tmdbController.js");

const tmdbRouter = Router();

tmdbRouter.get("/home", tmdbHomeController);
tmdbRouter.get("/movie/:id", tmdbMovieDetailsController);
tmdbRouter.get("/movie/:id/trailer", tmdbTrailerController);
tmdbRouter.get("/movie/:id/providers", tmdbProvidersController);

module.exports = tmdbRouter;
