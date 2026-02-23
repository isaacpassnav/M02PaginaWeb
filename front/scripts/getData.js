const { transformData } = require("./transformData.js");
const { tempData } = require("./tempData.js");
const axios = require("axios");

function getApiBaseUrl() {
  const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  return isLocal ? "http://localhost:3000" : `${window.location.origin}/api`;
}

const tmdbBackApi = `${getApiBaseUrl()}/tmdb/home`;

async function getData(url, options = {}) {
  const { render = true } = options;

  try {
    const response = await axios.get(url || tmdbBackApi, { timeout: 8000 });
    const movies = Array.isArray(response.data) ? response.data : [];

    if (!movies.length) {
      throw new Error("Backend returned no content");
    }

    if (render) {
      transformData(movies);
    }

    return movies;
  } catch (error) {
    console.warn("TMDB backend unavailable, loading local backup", error.message);
    if (render) {
      transformData(tempData);
    }
    return tempData;
  }
}

module.exports = getData;
