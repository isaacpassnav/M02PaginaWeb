const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const app = require("./src/server.js");
const conDb = require("./src/config/dbCon.js");

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});

conDb()
  .then(() => {
    console.log("Base de datos conectada");
  })
  .catch((error) => {
    console.log("Error al conectar a la base de datos:", error.message);
    console.log("El servidor sigue activo para endpoints TMDB y autenticación.");
  });
