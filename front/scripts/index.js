const getData = require("./getData.js");

const endPoint = "http://localhost:3000/tmdb/home";
const SESSION_KEY = "movieAppSession";

const yearLabel = document.getElementById("year");
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

renderAuthState();
initHeroButtons();
getData(endPoint);
