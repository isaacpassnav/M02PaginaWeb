const { Router } = require("express");
const moviesRouter = require("./moviesRoutes");
const postRouter = require("./postRouter");

const router = Router();

router.use("/movies", moviesRouter);
router.use("/movies", postRouter);

module.exports = router;
