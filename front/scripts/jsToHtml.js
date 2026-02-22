function cardsLoad(movie) {
  const div = document.createElement("div");
  const img = document.createElement("img");
  const h4 = document.createElement("h4");
  const p = document.createElement("p");
  const actions = document.createElement("div");
  const watchNowButton = document.createElement("button");
  const moreInfoButton = document.createElement("button");

  const poster = movie.poster || "https://via.placeholder.com/600x900/111827/ffffff?text=No+Poster";
  const fallbackBackground = "./pages/backdrop.jpg";
  const dynamicBackground = movie.background || poster || fallbackBackground;

  img.src = poster;
  img.classList.add("guardians");
  img.alt = movie.title || "Movie";
  img.value = movie.id || "";
  img.dataset.background = dynamicBackground;

  img.addEventListener("error", () => {
    img.src = "https://via.placeholder.com/600x900/111827/ffffff?text=Image+Unavailable";
  });

  h4.textContent = movie.title || "Title unavailable";
  p.textContent = movie.description || "No description available.";
  p.classList.add("card-description");

  actions.classList.add("card-actions");
  watchNowButton.textContent = "Watch now";
  moreInfoButton.textContent = "More info";
  moreInfoButton.classList.add("btn-ghost");

  watchNowButton.addEventListener("click", () => {
    const watchUrl = movie.watchUrl || "";
    if (watchUrl) {
      window.open(watchUrl, "_blank", "noopener,noreferrer");
    }
  });

  moreInfoButton.addEventListener("click", () => {
    const infoUrl = movie.infoUrl || "";
    if (infoUrl) {
      window.open(infoUrl, "_blank", "noopener,noreferrer");
    }
  });

  actions.appendChild(watchNowButton);
  actions.appendChild(moreInfoButton);

  div.classList.add("card");
  div.appendChild(img);
  div.appendChild(h4);
  div.appendChild(p);
  div.appendChild(actions);

  img.addEventListener("mouseenter", (event) => {
    const section2 = document.getElementById("section2");
    section2.style.backgroundImage = `linear-gradient(rgba(7,13,24,0.86), rgba(7,13,24,0.9)), url(${event.target.dataset.background})`;
  });

  return div;
}

module.exports = {
  cardsLoad,
};
