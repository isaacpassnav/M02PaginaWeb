const { Router } = require("express");
const { moviesController } = require("../controllers/moviesController.js")

const moviesRouter = Router();

moviesRouter.get("/", moviesController);

module.exports = moviesRouter;
