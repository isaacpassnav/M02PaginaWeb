const { cardsLoad } = require("./jsToHtml.js");
const { startHeroCarousel } = require("./heroCarousel.js");

function buildMovieUrls(movie) {
  const safeTitle = encodeURIComponent(`${movie.title || "movie"} trailer`);
  const safeQuery = encodeURIComponent(`${movie.title || "movie"} film info`);

  movie.watchUrl =
    movie.watchUrl ||
    movie.trailerUrl ||
    `https://www.youtube.com/results?search_query=${safeTitle}`;

  movie.infoUrl =
    movie.infoUrl ||
    movie.imdbUrl ||
    movie.homepage ||
    `https://www.google.com/search?q=${safeQuery}`;
}

function transformData(data) {
  const cardsContainer = document.querySelector(".section2");
  cardsContainer.innerHTML = "";

  const defaultBackground = "./pages/backdrop.jpg";

  data.forEach((movie, index) => {
    movie.id = movie.id || index + 1;
    movie.description = movie.description || "No description available.";
    movie.year = movie.year || "N/A";
    movie.duration = movie.duration || "N/A";
    movie.background = movie.background || movie.poster || defaultBackground;
    buildMovieUrls(movie);
  });

  startHeroCarousel(data.slice(0, 10));

  const htmlCardsArray = data.map(cardsLoad);
  htmlCardsArray.forEach((movie) => cardsContainer.appendChild(movie));
}

module.exports = {
  transformData,
};
