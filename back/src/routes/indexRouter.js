const { Router } = require("express");
const moviesRouter = require("./moviesRoutes");
const postRouter = require("./postRouter");
const tmdbRouter = require("./tmdbRoutes");

const router = Router();

router.use("/movies", moviesRouter);
router.use("/movies", postRouter);
router.use("/tmdb", tmdbRouter);

module.exports = router;
