const { cardsLoad } = require("./jsToHtml.js");
const { startHeroCarousel } = require("./heroCarousel.js");
const PAGE_SIZE = 12;

function getVisiblePages(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set([1, totalPages, currentPage, currentPage - 1, currentPage + 1]);
  return [...pages]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);
}

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
  const moviesGrid = document.createElement("div");
  const pagination = document.createElement("div");

  moviesGrid.classList.add("movies-grid");
  pagination.classList.add("movies-pagination");

  cardsContainer.appendChild(moviesGrid);
  cardsContainer.appendChild(pagination);

  const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE));
  let currentPage = 1;

  const renderCurrentPage = (pageNumber) => {
    currentPage = pageNumber;
    moviesGrid.innerHTML = "";

    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const pageMovies = data.slice(start, end);
    const htmlCardsArray = pageMovies.map(cardsLoad);
    htmlCardsArray.forEach((movieCard, index) => {
      movieCard.style.animationDelay = `${index * 45}ms`;
      moviesGrid.appendChild(movieCard);
    });

    renderPaginationControls();
  };

  const renderPaginationControls = () => {
    pagination.innerHTML = "";

    const prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.classList.add("page-btn");
    prevBtn.textContent = "Prev";
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener("click", () => renderCurrentPage(currentPage - 1));
    pagination.appendChild(prevBtn);

    const numbersList = document.createElement("div");
    numbersList.classList.add("page-numbers");
    const visiblePages = getVisiblePages(currentPage, totalPages);
    let previousPage = 0;

    visiblePages.forEach((page) => {
      if (previousPage && page - previousPage > 1) {
        const dots = document.createElement("span");
        dots.classList.add("page-dots");
        dots.textContent = "...";
        numbersList.appendChild(dots);
      }

      const numberBtn = document.createElement("button");
      numberBtn.type = "button";
      numberBtn.classList.add("page-btn", "page-number-btn");
      if (page === currentPage) {
        numberBtn.classList.add("active");
      }
      numberBtn.textContent = String(page);
      numberBtn.addEventListener("click", () => renderCurrentPage(page));
      numbersList.appendChild(numberBtn);
      previousPage = page;
    });

    pagination.appendChild(numbersList);

    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.classList.add("page-btn");
    nextBtn.textContent = "Next";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener("click", () => renderCurrentPage(currentPage + 1));
    pagination.appendChild(nextBtn);
  };

  renderCurrentPage(1);
}

module.exports = {
  transformData,
};
