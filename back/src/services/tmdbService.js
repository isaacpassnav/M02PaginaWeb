const TMDB_BASE_URL = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
const TMDB_TOKEN = process.env.TMDB_API_TOKEN || "";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

function ensureConfig() {
  if (!TMDB_TOKEN) {
    throw new Error("TMDB token is missing. Check back/.env");
  }
}

async function tmdbRequest(path, query = {}) {
  ensureConfig();

  const url = new URL(`${TMDB_BASE_URL}${path}`);
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.append(key, String(value));
    }
  });

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
      accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

function imageUrl(size, imagePath) {
  if (!imagePath) return "";
  return `${TMDB_IMAGE_BASE}/${size}${imagePath}`;
}

async function getGenreMap() {
  const data = await tmdbRequest("/genre/movie/list", { language: "en-US" });
  const map = new Map();
  (data.genres || []).forEach((genre) => map.set(genre.id, genre.name));
  return map;
}

function normalizeMovie(movie, genreMap = new Map()) {
  const title = movie.title || "Untitled";
  const year = movie.release_date ? Number(movie.release_date.split("-")[0]) : "N/A";
  const genres =
    Array.isArray(movie.genres) && movie.genres.length
      ? movie.genres.map((g) => g.name)
      : Array.isArray(movie.genre_ids)
      ? movie.genre_ids.map((id) => genreMap.get(id)).filter(Boolean)
      : [];

  return {
    id: movie.id,
    tmdbId: movie.id,
    title,
    year,
    director: "N/A",
    duration: movie.runtime ? `${movie.runtime} min` : "N/A",
    genre: genres.length ? genres : ["Drama"],
    rate: Math.round(Number(movie.vote_average || 0) * 10) / 10,
    description: movie.overview || "No description available.",
    poster: imageUrl("w500", movie.poster_path),
    background: imageUrl("original", movie.backdrop_path) || imageUrl("w500", movie.poster_path),
    watchUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(`${title} trailer`)}`,
    infoUrl: `https://www.themoviedb.org/movie/${movie.id}`,
  };
}

function pickTrailer(videos = []) {
  const youtubeVideos = videos.filter((video) => video.site === "YouTube");
  const preferred =
    youtubeVideos.find((video) => video.type === "Trailer" && video.official) ||
    youtubeVideos.find((video) => video.type === "Trailer") ||
    youtubeVideos[0];

  return preferred ? `https://www.youtube.com/watch?v=${preferred.key}` : null;
}

async function getHomeMovies(page = 1) {
  const [genreMap, popular] = await Promise.all([
    getGenreMap(),
    tmdbRequest("/movie/popular", {
      language: "en-US",
      page,
      include_adult: false,
    }),
  ]);

  return (popular.results || []).map((movie) => normalizeMovie(movie, genreMap));
}

async function getMovieDetails(movieId) {
  const movie = await tmdbRequest(`/movie/${movieId}`, {
    language: "en-US",
    append_to_response: "videos",
  });

  const normalized = normalizeMovie(movie);
  const trailerUrl = pickTrailer(movie.videos?.results || []);

  return {
    ...normalized,
    watchUrl: trailerUrl || normalized.watchUrl,
  };
}

async function getMovieTrailer(movieId) {
  const videos = await tmdbRequest(`/movie/${movieId}/videos`, { language: "en-US" });
  const trailerUrl = pickTrailer(videos.results || []);
  return {
    movieId,
    trailerUrl,
  };
}

async function getMovieProviders(movieId, region = "US") {
  const providers = await tmdbRequest(`/movie/${movieId}/watch/providers`);
  const regionData = providers.results?.[region] || {};

  return {
    movieId,
    region,
    link: regionData.link || null,
    flatrate: regionData.flatrate || [],
    rent: regionData.rent || [],
    buy: regionData.buy || [],
  };
}

module.exports = {
  getHomeMovies,
  getMovieDetails,
  getMovieTrailer,
  getMovieProviders,
};
