const axios = require("axios");

console.log(axios.get("https://students-api.up.railway.app/movies"));
// Los metodos de axios siempre retorna una promesa 

// ! IMPORTANTA PARA LOS  METODOS POST¡

axios.post(url,{ // ENVIA INFO AL SERVIDOR DE PARTE DEL CLIENTE
    title: "mohana",
    year: 2020
});
axios.put(url, {}) // MODIFICA UN RECURSO, OBJETO CON PROPIEDADES

axios.delete(url); // ELIMINA ALGUN RECURSO DEL SERVIDOR