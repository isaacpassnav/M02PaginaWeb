const getData = require("./getData.js");
const { transformData } = require("./transformData.js");

function getApiBaseUrl() {
  const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  return isLocal ? "http://localhost:3000" : `${window.location.origin}/api`;
}

const endPoint = `${getApiBaseUrl()}/tmdb/home?pages=6`;
const SESSION_KEY = "movieAppSession";
const MAX_SUGGESTIONS = 6;

let fullMovieList = [];
let activeGenre = "All";
let searchTerm = "";
let searchDebounceTimer = null;

const yearLabel = document.getElementById("year");
const searchInput = document.getElementById("movieSearchInput");
const searchContainer = document.querySelector(".buscarPeliculas");
const genreFiltersContainer = document.getElementById("genreFilters");

if (yearLabel) {
  yearLabel.textContent = String(new Date().getFullYear());
}

function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function renderAuthState() {
  const userStatusIcon = document.getElementById("userStatusIcon");
  const userAccessLink = document.getElementById("userAccessLink");
  const welcomeMessage = document.getElementById("welcomeMessage");

  const session = getSession();
  const isLoggedIn = Boolean(session && session.username);

  if (isLoggedIn) {
    const safeName = String(session.username).trim();
    userStatusIcon.className = "bi bi-person-check-fill";
    userAccessLink.href = "#";
    userAccessLink.title = `${safeName || "User"} is signed in. Click to sign out.`;
    welcomeMessage.textContent = `Welcome back, ${safeName}.`;
  } else {
    userStatusIcon.className = "bi bi-person-circle";
    userAccessLink.href = "./auth/signin.html";
    userAccessLink.title = "Sign in";
    welcomeMessage.textContent = "Sign in to personalize your movie experience.";
  }
}

function initHeroButtons() {
  const heroWatchButton = document.getElementById("heroWatchButton");
  const heroInfoButton = document.getElementById("heroInfoButton");

  if (heroWatchButton) {
    heroWatchButton.addEventListener("click", () => {
      const watchUrl = heroWatchButton.dataset.watchUrl || "";
      if (watchUrl) {
        window.open(watchUrl, "_blank", "noopener,noreferrer");
      }
    });
  }

  if (heroInfoButton) {
    heroInfoButton.addEventListener("click", () => {
      const infoUrl = heroInfoButton.dataset.infoUrl || "";
      if (infoUrl) {
        window.open(infoUrl, "_blank", "noopener,noreferrer");
      }
    });
  }
}

function normalizeText(value) {
  return String(value || "").toLowerCase().trim();
}

function getMovieGenres(movie) {
  if (Array.isArray(movie.genre)) {
    return movie.genre.filter(Boolean);
  }
  if (typeof movie.genre === "string" && movie.genre.trim()) {
    return movie.genre
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function matchesSearch(movie, query) {
  if (!query) return true;

  const title = normalizeText(movie.title);
  const description = normalizeText(movie.description);
  const genres = getMovieGenres(movie).map(normalizeText);

  return title.includes(query) || description.includes(query) || genres.some((genre) => genre.includes(query));
}

function filterMovies() {
  const normalizedSearch = normalizeText(searchTerm);
  return fullMovieList.filter((movie) => {
    const genres = getMovieGenres(movie);
    const matchesGenre = activeGenre === "All" || genres.includes(activeGenre);
    return matchesGenre && matchesSearch(movie, normalizedSearch);
  });
}

function applyFilters() {
  transformData(filterMovies());
}

function getTopGenres(movies) {
  const counts = new Map();
  movies.forEach((movie) => {
    getMovieGenres(movie).forEach((genre) => {
      counts.set(genre, (counts.get(genre) || 0) + 1);
    });
  });

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([genre]) => genre);
}

function renderGenreFilters() {
  if (!genreFiltersContainer) return;

  const genres = ["All", ...getTopGenres(fullMovieList)];
  genreFiltersContainer.innerHTML = "";

  genres.forEach((genre) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "genre-chip";
    if (genre === activeGenre) {
      button.classList.add("active");
    }
    button.textContent = genre;
    button.addEventListener("click", () => {
      activeGenre = genre;
      renderGenreFilters();
      applyFilters();
    });
    genreFiltersContainer.appendChild(button);
  });
}

function createSuggestionBox() {
  if (!searchContainer) return null;

  let box = searchContainer.querySelector(".search-suggestions");
  if (!box) {
    box = document.createElement("div");
    box.className = "search-suggestions";
    searchContainer.appendChild(box);
  }
  return box;
}

function renderSuggestions(query) {
  const suggestionsBox = createSuggestionBox();
  if (!suggestionsBox) return;

  suggestionsBox.innerHTML = "";

  if (!query) {
    suggestionsBox.classList.remove("open");
    return;
  }

  const normalizedQuery = normalizeText(query);
  const suggestions = fullMovieList.filter((movie) => matchesSearch(movie, normalizedQuery)).slice(0, MAX_SUGGESTIONS);

  if (!suggestions.length) {
    suggestionsBox.classList.remove("open");
    return;
  }

  suggestions.forEach((movie) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "suggestion-item";
    button.innerHTML = `
      <span class="suggestion-title">${movie.title || "Untitled"}</span>
      <span class="suggestion-meta">${movie.year || "N/A"}</span>
    `;
    button.addEventListener("click", () => {
      if (searchInput) {
        searchInput.value = movie.title || "";
      }
      searchTerm = movie.title || "";
      suggestionsBox.classList.remove("open");
      applyFilters();
    });
    suggestionsBox.appendChild(button);
  });

  suggestionsBox.classList.add("open");
}

function initSearch() {
  if (!searchInput) return;

  searchInput.addEventListener("input", (event) => {
    const value = event.target.value || "";
    searchTerm = value;
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
      applyFilters();
      renderSuggestions(value);
    }, 180);
  });

  searchInput.addEventListener("focus", () => {
    renderSuggestions(searchInput.value || "");
  });

  searchInput.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();

    const firstSuggestion = document.querySelector(".suggestion-item");
    if (firstSuggestion) {
      firstSuggestion.click();
      return;
    }

    applyFilters();
  });

  document.addEventListener("click", (event) => {
    const suggestionsBox = document.querySelector(".search-suggestions");
    if (!suggestionsBox || !searchContainer) return;
    if (!searchContainer.contains(event.target)) {
      suggestionsBox.classList.remove("open");
    }
  });
}

const userAccessLink = document.getElementById("userAccessLink");
if (userAccessLink) {
  userAccessLink.addEventListener("click", (event) => {
    const session = getSession();
    const isLoggedIn = Boolean(session && session.username);

    if (!isLoggedIn) {
      return;
    }

    event.preventDefault();
    clearSession();
    renderAuthState();
  });
}

async function initApp() {
  renderAuthState();
  initHeroButtons();
  initSearch();

  fullMovieList = await getData(endPoint, { render: false });
  renderGenreFilters();
  applyFilters();
}

initApp();
