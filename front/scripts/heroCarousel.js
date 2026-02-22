let heroTimer = null;
let activeIndex = 0;

function normalizeGenre(genre) {
  if (Array.isArray(genre)) {
    return genre.join(", ");
  }
  return genre || "Sci-Fi";
}

function applyHeroMovie(movie) {
  const title = document.querySelector(".hero-text h1");
  const tags = document.querySelectorAll(".description h2");
  const overview = document.querySelector(".hero-overview");
  const hero = document.querySelector(".section0");
  const heroWatchButton = document.getElementById("heroWatchButton");
  const heroInfoButton = document.getElementById("heroInfoButton");

  if (!movie || !hero) {
    return;
  }

  if (title) {
    title.textContent = movie.title || "Featured Movie";
  }

  if (overview) {
    overview.textContent = movie.description || "No description available.";
  }

  if (tags.length >= 4) {
    tags[0].textContent = "Top pick";
    tags[1].textContent = String(movie.year || "N/A");
    tags[2].textContent = String(movie.duration || "N/A");
    tags[3].textContent = normalizeGenre(movie.genre);
  }

  if (movie.background) {
    hero.style.backgroundImage = `linear-gradient(0deg, rgba(7,13,24,0.84) 0%, rgba(7,13,24,0.4) 32%, rgba(7,13,24,0.15) 62%, rgba(7,13,24,0.04) 100%), linear-gradient(90deg, rgba(7,13,24,0.9) 0%, rgba(7,13,24,0.15) 55%, rgba(7,13,24,0.05) 100%), url(${movie.background})`;
    hero.style.backgroundSize = "cover";
    hero.style.backgroundPosition = "center top";
    hero.style.backgroundRepeat = "no-repeat";
  }

  if (heroWatchButton) {
    heroWatchButton.dataset.watchUrl = movie.watchUrl || "";
  }

  if (heroInfoButton) {
    heroInfoButton.dataset.infoUrl = movie.infoUrl || "";
  }
}

function startHeroCarousel(movies) {
  if (!Array.isArray(movies) || movies.length === 0) {
    return;
  }

  if (heroTimer) {
    clearInterval(heroTimer);
  }

  activeIndex = 0;
  applyHeroMovie(movies[activeIndex]);

  if (movies.length === 1) {
    return;
  }

  heroTimer = setInterval(() => {
    activeIndex = (activeIndex + 1) % movies.length;
    applyHeroMovie(movies[activeIndex]);
  }, 6500);
}

module.exports = {
  startHeroCarousel,
};
