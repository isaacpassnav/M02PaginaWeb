const axios = require("axios");

function getApiBaseUrl() {
  const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  return isLocal ? "http://localhost:3000" : `${window.location.origin}/api`;
}

const url = `${getApiBaseUrl()}/movies`;

function isValidHttpUrl(value) {
  try {
    const parsed = new URL(String(value || "").trim());
    return ["http:", "https:"].includes(parsed.protocol);
  } catch (error) {
    return false;
  }
}

function collectMovieForm() {
  return {
    title: document.getElementById("title").value.trim(),
    year: Number(document.getElementById("movieYear").value),
    director: document.getElementById("director").value.trim(),
    duration: document.getElementById("duration").value.trim(),
    genre: document.getElementById("genre").value.trim(),
    rate: Number(document.getElementById("rate").value),
    poster: document.getElementById("poster").value.trim(),
    watchUrl: document.getElementById("watchUrl").value.trim(),
    infoUrl: document.getElementById("infoUrl").value.trim(),
    website: document.getElementById("website").value.trim(),
  };
}

function validateMovieForm(payload) {
  const currentYear = new Date().getFullYear();
  const errors = [];

  if (!payload.title || payload.title.length < 2) errors.push("Title is too short.");
  if (!Number.isInteger(payload.year) || payload.year < 1888 || payload.year > currentYear + 2) {
    errors.push("Year is invalid.");
  }
  if (!payload.director || payload.director.length < 2) errors.push("Director is required.");
  if (!payload.duration) errors.push("Duration is required.");
  if (!payload.genre) errors.push("Genre is required.");
  if (!Number.isFinite(payload.rate) || payload.rate < 0 || payload.rate > 10) {
    errors.push("Rate must be between 0 and 10.");
  }
  if (!isValidHttpUrl(payload.poster)) errors.push("Poster URL must be valid (http/https).");
  if (payload.watchUrl && !isValidHttpUrl(payload.watchUrl)) errors.push("Watch URL must be valid.");
  if (payload.infoUrl && !isValidHttpUrl(payload.infoUrl)) errors.push("Info URL must be valid.");

  if (payload.website) {
    errors.push("Spam validation failed.");
  }

  return errors;
}

async function addMovie(event) {
  event.preventDefault();

  const submitButton = document.querySelector(".enviar");
  const movieData = collectMovieForm();
  const validationErrors = validateMovieForm(movieData);

  if (validationErrors.length) {
    alert(validationErrors.join("\n"));
    return;
  }

  try {
    submitButton.disabled = true;
    await axios.post(url, movieData, { timeout: 10000 });
    alert("Movie added successfully.");
    clearForm();
  } catch (error) {
    const message =
      error?.response?.data?.error || error?.response?.data?.details?.join("\n") || "Error sending data.";
    alert(message);
  } finally {
    submitButton.disabled = false;
  }
}

function clearForm() {
  const inputs = document.querySelectorAll(".input");
  inputs.forEach((input) => {
    input.value = "";
  });
  const honeypot = document.getElementById("website");
  if (honeypot) {
    honeypot.value = "";
  }
}

document.querySelector(".enviar").addEventListener("click", addMovie);
document.querySelector(".limpiar").addEventListener("click", clearForm);
