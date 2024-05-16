const cardsContainer = document.querySelector('.section2');
const { transformData } = require("./transformData.js");
const { cardsLoad } = require("./jsToHtml.js");
const { tempData } = require("./tempData.js");
const axios = require("axios");

async function getData(url){
    try {
        const respuesta = await axios.get(url);
        transformData(respuesta.data);
    } catch (error) {
        alert("No se puede cargar la información, se usará la información local");
        const arrayHtmlCards = tempData.map(cardsLoad);
        arrayHtmlCards.forEach((pelicula) => cardsContainer.appendChild(pelicula));
    }
}

module.exports = getData;
