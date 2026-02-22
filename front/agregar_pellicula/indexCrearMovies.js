const axios = require("axios");
const url = "http://localhost:3000/movies";

function addMovie(event) {
  event.preventDefault();

  const requiredIds = ["title", "year", "director", "duration", "genre", "rate", "poster"];
  const isValid = requiredIds.every((id) => document.getElementById(id).value.trim());

  if (!isValid) {
    alert("Please complete all required fields.");
    return;
  }

  const movieData = {
    title: document.getElementById("title").value,
    year: Number(document.getElementById("year").value),
    director: document.getElementById("director").value,
    duration: document.getElementById("duration").value,
    genre: document.getElementById("genre").value,
    rate: Number(document.getElementById("rate").value),
    poster: document.getElementById("poster").value,
    watchUrl: document.getElementById("watchUrl").value,
    infoUrl: document.getElementById("infoUrl").value,
  };

  axios
    .post(url, movieData)
    .then((response) => {
      console.log("Movie saved", response.data);
      alert("Movie added successfully.");
    })
    .catch((error) => {
      console.error("Error sending data", error);
      alert("Error sending data.");
    });
}

function clearForm() {
  const inputs = document.querySelectorAll(".input");
  inputs.forEach((input) => {
    input.value = "";
  });
}

document.querySelector(".enviar").addEventListener("click", addMovie);
document.querySelector(".limpiar").addEventListener("click", clearForm);
