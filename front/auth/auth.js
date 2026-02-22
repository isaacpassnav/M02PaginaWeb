const SESSION_KEY = "movieAppSession";
const USERS_KEY = "movieAppUsers";

function getApiBaseUrl() {
  const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  return isLocal ? "http://localhost:3000" : `${window.location.origin}/api`;
}

const AUTH_API_BASE = `${getApiBaseUrl()}/auth`;

function setMessage(el, text, type) {
  el.textContent = text;
  el.className = `auth-message ${type}`;
}

function getUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function saveSession(user) {
  const session = {
    username: user.username,
    email: user.email,
    token: user.token || `local-${Date.now()}`,
    loggedInAt: new Date().toISOString(),
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

async function signupWithApi(payload) {
  const response = await fetch(`${AUTH_API_BASE}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Signup endpoint failed");
  }

  return response.json();
}

async function signinWithApi(payload) {
  const response = await fetch(`${AUTH_API_BASE}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Signin endpoint failed");
  }

  return response.json();
}

function signupLocal(username, email, password) {
  const users = getUsers();
  const exists = users.some((user) => user.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    throw new Error("This email is already registered.");
  }

  const user = {
    id: Date.now(),
    username,
    email,
    password,
  };
  users.push(user);
  saveUsers(users);
  return user;
}

function signinLocal(email, password) {
  const users = getUsers();
  const found = users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password
  );
  if (!found) {
    throw new Error("Invalid email or password.");
  }
  return found;
}

function redirectHome() {
  window.location.href = "../index.html";
}

function initSignup() {
  const form = document.getElementById("signupForm");
  const message = document.getElementById("signupMessage");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = document.getElementById("signupUsername").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("signupConfirmPassword").value;

    if (!username || !email || !password) {
      setMessage(message, "Please complete all fields.", "error");
      return;
    }
    if (password.length < 6) {
      setMessage(message, "Password must have at least 6 characters.", "error");
      return;
    }
    if (password !== confirmPassword) {
      setMessage(message, "Passwords do not match.", "error");
      return;
    }

    try {
      let userPayload;
      try {
        const apiData = await signupWithApi({ username, email, password });
        userPayload = apiData.user || { username, email, token: apiData.token };
      } catch (apiError) {
        const localUser = signupLocal(username, email, password);
        userPayload = { username: localUser.username, email: localUser.email };
      }

      saveSession(userPayload);
      setMessage(message, `Welcome, ${userPayload.username}! Redirecting...`, "success");
      setTimeout(redirectHome, 900);
    } catch (error) {
      setMessage(message, error.message || "Could not create account.", "error");
    }
  });
}

function initSignin() {
  const form = document.getElementById("signinForm");
  const message = document.getElementById("signinMessage");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("signinEmail").value.trim();
    const password = document.getElementById("signinPassword").value;

    if (!email || !password) {
      setMessage(message, "Please complete all fields.", "error");
      return;
    }

    try {
      let userPayload;
      try {
        const apiData = await signinWithApi({ email, password });
        userPayload = apiData.user || { username: apiData.username, email, token: apiData.token };
      } catch (apiError) {
        const localUser = signinLocal(email, password);
        userPayload = { username: localUser.username, email: localUser.email };
      }

      saveSession(userPayload);
      setMessage(message, `Welcome back, ${userPayload.username}! Redirecting...`, "success");
      setTimeout(redirectHome, 900);
    } catch (error) {
      setMessage(message, error.message || "Could not sign in.", "error");
    }
  });
}

if (document.getElementById("signupForm")) {
  initSignup();
}

if (document.getElementById("signinForm")) {
  initSignin();
}
