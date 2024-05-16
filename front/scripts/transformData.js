// const{ cardsLoad } = require("./jsToHtml.js")

// function transformData(data){
//     // console.log(data)
//     data.forEach((pelicula,index) =>{
//         pelicula.id = index + 1;
//         switch(pelicula.id){
//             case 1:
//                 pelicula.background = "https://wallpaperaccess.com/full/96391.jpg"
//                 break;
//             case 2: 
//                 pelicula.background = "https://th.bing.com/th/id/R.2d463f54bf6c4896262523ccf5cc37aa?rik=EVT0W%2bqJ%2fjzaJg&riu=http%3a%2f%2fhdqwalls.com%2fwallpapers%2fstar-wars-poster-4k-af.jpg&ehk=XUwzZ2HStyJCqpLQKYqNtM1TqtI3A0CjNb0VhwOxx0I%3d&risl=1&pid=ImgRaw&r=0"
//                 break;
//             case 3:
//                 pelicula.background = "https://c8.alamy.com/comp/HCH6BE/the-lord-of-the-rings-fellowship-of-the-ring-2001-HCH6BE.jpg"
//             default:
//                 break;
//         }
//     });
//     const cardsContainer = document.querySelector('.section2');
//     const arrayHtmlCards = data.map(cardsLoad);
//     arrayHtmlCards.forEach((pelicula) => cardsContainer.appendChild(pelicula));
// };
// module.exports = { 
//     transformData,
// }
const { cardsLoad } = require("./jsToHtml.js");

function transformData(data) {
    data.forEach((pelicula, index) => {
        pelicula.id = index + 1;
        switch(pelicula.id) {
            case 1:
                pelicula.background = "https://wallpaperaccess.com/full/96391.jpg";
                break;
            case 2:
                pelicula.background = "https://th.bing.com/th/id/R.2d463f54bf6c4896262523ccf5cc37aa?rik=EVT0W%2bqJ%2fjzaJg&riu=http%3a%2f%2fhdqwalls.com%2fwallpapers%2fstar-wars-poster-4k-af.jpg&ehk=XUwzZ2HStyJCqpLQKYqNtM1TqtI3A0CjNb0VhwOxx0I%3d&risl=1&pid=ImgRaw&r=0";
                break;
            case 3:
                pelicula.background = "https://c8.alamy.com/comp/HCH6BE/the-lord-of-the-rings-fellowship-of-the-ring-2001-HCH6BE.jpg";
                break;
            default:
                break;
        }
    });

    const cardsContainer = document.querySelector('.section2');
    const arrayHtmlCards = data.map(cardsLoad);
    arrayHtmlCards.forEach((pelicula) => cardsContainer.appendChild(pelicula));
};

module.exports = { 
    transformData
};
