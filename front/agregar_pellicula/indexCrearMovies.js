// Eliminamos la línea de importación de axios ya que no es necesaria en este contexto
// import axios from "axios";

const axios = require("axios");
const url = "http://localhost:3000/movies";

function addMovie(event) {
    event.preventDefault();
    
    const inputs = document.querySelectorAll('.input');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
        }
    });

    if (!isValid) {
        alert("Por favor, completa todos los campos.");
    } else {
        const movieData = {
            title: document.getElementById("title").value,
            year: document.getElementById("year").value,
            director: document.getElementById("director").value,
            duration: document.getElementById("duration").value,
            genre: document.getElementById("genre").value,
            rate: document.getElementById("rate").value,
            poster: document.getElementById("poster").value
        };

        axios.post(url, movieData)
           .then(response => {
                console.log("Datos enviados con éxito", response.data);
                alert("Película agregada con éxito");
            })
           .catch(error => {
                console.error("Error al enviar los datos", error);
                alert("Error al enviar los datos");
            });
    }
}

function clearForm() {
    const inputs = document.querySelectorAll('.input');
    inputs.forEach(input => input.value = '');
}

// Asociamos el evento click del botón de enviar a la función addMovie
document.querySelector('.enviar').addEventListener('click', addMovie);

// Asociamos el evento click del botón de limpiar a la función clearForm
document.querySelector('.limpiar').addEventListener('click', clearForm);

