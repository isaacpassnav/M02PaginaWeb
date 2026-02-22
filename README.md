# Movie App - University Project

## 1. Project Overview
Movie App is a semi-fullstack web application built as a university project to practice end-to-end development concepts:
- frontend UI/UX implementation,
- backend API consumption and integration,
- database connectivity,
- modular architecture,
- and basic authentication flows.

The app is inspired by streaming platforms and focuses on discovery experience (hero section, movie cards, pagination, details, trailer links, and provider info).

## 2. Why This App Was Built
This project was created to:
- apply fullstack fundamentals in a real scenario,
- simulate a streaming-like catalog experience,
- integrate third-party movie data from TMDB,
- and build a solid base that can later evolve to a more robust stack (TypeScript, React/Next.js, advanced auth, and production-grade architecture).

## 3. Current Scope (University MVP)
The current version is intentionally scoped as an MVP:
- movie catalog UI with Netflix-style visual direction,
- dynamic hero with featured content,
- movie card grid with pagination,
- fallback local dataset when backend/API is unavailable,
- movie creation form connected to backend,
- basic sign-in/sign-up flow (with local fallback),
- contact and static informational pages.

This scope is valid and strong for academic delivery.

## 4. Tech Stack (Current)

### Frontend
- HTML5
- CSS3
- JavaScript (CommonJS modules)
- Bootstrap + Bootstrap Icons
- Axios
- Webpack
- Live Server

### Backend
- Node.js
- Express.js
- Mongoose + MongoDB Atlas
- dotenv
- CORS
- Morgan
- Nodemon

### External APIs
- TMDB API (movies, details, trailer metadata, watch providers)

## 5. Main Features
- Browse popular movies from TMDB.
- Hero banner with featured movie info and call-to-action buttons.
- Movie cards with:
  - year/rating badges,
  - poster image,
  - short description with "See more / See less",
  - "Watch now" and "More info" actions.
- Pagination with numeric navigation and ellipsis for large page sets.
- Add Movie form posting to backend database.
- Basic auth UI flow with session state in local storage (MVP mode).
- Responsive layout for desktop and mobile.

## 6. User Stories (MVP)
- As a visitor, I want to see trending/popular movies so I can quickly discover content.
- As a visitor, I want to paginate through movie results so I can browse more titles.
- As a visitor, I want to open trailer/search links so I can preview a movie.
- As a visitor, I want to open more info for a movie so I can read details.
- As a user, I want to sign up/sign in so I can personalize my experience.
- As an admin/student user, I want to add a movie manually so I can test CRUD behavior.

## 7. Future User Stories (Post-MVP)
- As a user, I want secure JWT-based auth so my account is protected.
- As a user, I want watchlist/favorites persisted in backend.
- As a user, I want continue-watching progress.
- As a user, I want legal provider links by region.
- As a product owner, I want analytics and observability for usage and performance.

## 8. Project Structure
```txt
M02PaginaWeb/
|- front/
|  |- index.html
|  |- scripts/
|  |- styles/
|  |- auth/
|  |- agregar_pellicula/
|  |- conctactanos/
|  |- public/
|- back/
|  |- index.js
|  |- src/
|     |- server.js
|     |- config/
|     |- controllers/
|     |- routes/
|     |- services/
|     |- models/
|- README.md
```

## 9. API Endpoints (Current)
### TMDB proxy endpoints
- `GET /tmdb/home?page=1&pages=5`
- `GET /tmdb/movie/:id`
- `GET /tmdb/movie/:id/trailer`
- `GET /tmdb/movie/:id/providers?region=US`

### Local movie endpoints
- `GET /movies`
- `POST /movies`

## 10. Environment Variables
Create `back/.env` with:

```env
TMDB_API_TOKEN=your_tmdb_bearer_token
TMDB_BASE_URL=https://api.themoviedb.org/3
DB_USER=your_mongodb_user
DB_PASSWORD=your_mongodb_password
```

> Important: `.env` files must never be committed.

## 11. Local Run Instructions

### Backend
```bash
cd back
npm install
npm start
```

### Frontend
```bash
cd front
npm install
npm run build:once
npm start
```

## 11.1 Deploy on Vercel
This repository is configured to deploy frontend + backend in a single Vercel project.

### Step 1. Push code to GitHub
Push your latest changes (including `vercel.json` and `api/index.js`) to your repository.

### Step 2. Create project in Vercel
1. Go to Vercel Dashboard.
2. Click **Add New Project**.
3. Import your GitHub repository.
4. Keep default settings and deploy.

### Step 3. Configure environment variables in Vercel
In **Project Settings > Environment Variables**, add:

```env
TMDB_API_TOKEN=your_tmdb_bearer_token
TMDB_BASE_URL=https://api.themoviedb.org/3
MONGODB_URI=your_full_mongodb_connection_string
```

> You can use `MONGODB_URI` directly (recommended for production).

### Step 4. Redeploy
After saving env vars, trigger a new deployment from Vercel.

### Step 5. Verify
- Home: `https://your-project.vercel.app/`
- TMDB endpoint: `https://your-project.vercel.app/api/tmdb/home`
- Create movie endpoint: `https://your-project.vercel.app/api/movies`

## 12. Academic Value
This project demonstrates:
- frontend-backend integration,
- API orchestration and fallback strategy,
- modular code organization,
- responsive design and UI iteration,
- and progressive enhancement from MVP to scalable architecture.

## 13. Known Limitations
- Authentication is MVP-level and not production-secure yet.
- Hardcoded local endpoints should move to environment-based config.
- No production deployment pipeline yet.
- TMDB does not provide full movie streaming files (metadata/discovery focus).

## 14. Next Evolution (Planned)
- Migrate to TypeScript.
- Rebuild frontend with React + Next.js.
- Add production-ready auth (JWT + secure cookies).
- Add role-based access and protected routes.
- Add better testing coverage (frontend + backend).
- Introduce CI/CD and deployment environments.

## 15. Author
Isaac Lehi Pasapera Navarro  
Fullstack Developer
