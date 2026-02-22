function cardsLoad(movie) {
  const div = document.createElement("div");
  const media = document.createElement("article");
  const cardTop = document.createElement("div");
  const yearBadge = document.createElement("span");
  const starsBadge = document.createElement("span");
  const favButton = document.createElement("button");
  const img = document.createElement("img");
  const overlay = document.createElement("div");
  const h4 = document.createElement("h4");
  const p = document.createElement("p");
  const moreDescriptionButton = document.createElement("button");
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

  const yearText = movie.year || "N/A";
  const stars = Math.max(1, Math.min(5, Math.round((Number(movie.rate) || 0) / 2)));
  const starsText = "\u2605".repeat(stars);

  cardTop.classList.add("card-top");
  yearBadge.classList.add("movie-badge");
  starsBadge.classList.add("movie-badge", "movie-stars");
  favButton.classList.add("fav-button");
  favButton.type = "button";

  yearBadge.textContent = yearText;
  starsBadge.textContent = starsText;
  favButton.innerHTML = '<i class="bi bi-heart"></i>';

  cardTop.appendChild(yearBadge);
  cardTop.appendChild(starsBadge);
  cardTop.appendChild(favButton);

  img.addEventListener("error", () => {
    img.src = "https://via.placeholder.com/600x900/111827/ffffff?text=Image+Unavailable";
  });

  h4.textContent = movie.title || "Title unavailable";
  p.textContent = movie.description || "No description available.";
  p.classList.add("card-description");

  moreDescriptionButton.type = "button";
  moreDescriptionButton.classList.add("description-toggle");
  moreDescriptionButton.textContent = "See more";

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

  if (!p.textContent || p.textContent.length < 110) {
    moreDescriptionButton.hidden = true;
  } else {
    moreDescriptionButton.addEventListener("click", () => {
      p.classList.toggle("expanded");
      moreDescriptionButton.textContent = p.classList.contains("expanded") ? "See less" : "See more";
    });
  }

  media.classList.add("card-media");
  media.appendChild(img);
  media.appendChild(cardTop);

  overlay.classList.add("card-overlay");
  overlay.appendChild(h4);
  overlay.appendChild(p);
  overlay.appendChild(moreDescriptionButton);
  overlay.appendChild(actions);
  media.appendChild(overlay);

  div.classList.add("card");
  div.appendChild(media);

  img.addEventListener("mouseenter", (event) => {
    const section2 = document.getElementById("section2");
    if (section2) {
      section2.style.backgroundImage = `linear-gradient(rgba(7,13,24,0.86), rgba(7,13,24,0.9)), url(${event.target.dataset.background})`;
    }
  });

  return div;
}

module.exports = {
  cardsLoad,
};
