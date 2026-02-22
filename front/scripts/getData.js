const { transformData } = require("./transformData.js");
const { tempData } = require("./tempData.js");
const axios = require("axios");

const cardsContainer = document.querySelector(".section2");
const tmdbBackApi = "http://localhost:3000/tmdb/home";

function renderCards(data) {
  cardsContainer.innerHTML = "";
  const htmlCardsArray = data.map(cardsLoad);
  htmlCardsArray.forEach((movie) => cardsContainer.appendChild(movie));
}

async function getData(url) {
  try {
    const response = await axios.get(url || tmdbBackApi, { timeout: 8000 });
    const movies = Array.isArray(response.data) ? response.data : [];

    if (!movies.length) {
      throw new Error("Backend returned no content");
    }

    transformData(movies);
  } catch (error) {
    console.warn("TMDB backend unavailable, loading local backup", error.message);
    transformData(tempData);
  }
}

module.exports = getData;
