const app = require("./src/server.js");

const conDb = require("./src/config/dbCon.js");

conDb()
    .then(() => {
        app.listen(3000, () => {
            console.log("escuchando en el puerto 3000");
        });
    })
    .catch((error) => {
        console.log("Error al conectar a la base de datos:", error);
    });
