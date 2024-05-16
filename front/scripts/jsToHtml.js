function cardsLoad(pelicula) {
    const div = document.createElement("div");  
    const img = document.createElement("img");
    const h4 = document.createElement("h4"); 
    const button = document.createElement("button");

    img.src = pelicula.poster;
    img.classList.add("guardians"); 
    img.alt = pelicula.title;
    img.value = pelicula.id;
    img.dataset.background = pelicula.background;  // asignacion del background

    h4.innerHTML = pelicula.title; 
    button.innerHTML = "ver ahora";

    div.classList.add("card");
    div.appendChild(img); 
    div.appendChild(h4); 
    div.appendChild(button); 

    img.addEventListener("mouseenter", function(ele) {
        const background = ele.target.dataset.background;
        const section2 = document.getElementById("section2")
        section2.style.backgroundImage = `url(${pelicula.background})`
    }); 
    return div;
}
module.exports = {
    cardsLoad
}

// function cardsLoad(pelicula) {
//     const div = document.createElement("div");
//     const img = document.createElement("img");
//     const h4 = document.createElement("h4");
//     const button = document.createElement("button");

//     img.src = pelicula.poster;
//     img.classList.add("guardians");
//     img.alt = pelicula.title;
//     img.value = pelicula.id;
//     img.dataset.background = pelicula.background;

//     h4.innerHTML = pelicula.title;
//     button.innerHTML = "ver ahora";

//     div.classList.add("card");
//     div.appendChild(img);
//     div.appendChild(h4);
//     div.appendChild(button);

//     img.addEventListener("mouseenter", function(ele) {
//         const background = ele.target.dataset.background;
//         const section2 = document.getElementById("section2");
//         section2.style.backgroundImage = `url(${background})`;
//     });
//     return div;
// }

// module.exports = {
//     cardsLoad
// };
