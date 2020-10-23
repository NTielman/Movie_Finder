//------------global variable declarations----------------------
import { movies } from "./database.js";
const getRadioInput = document.querySelectorAll('input[type="radio"]');
const textInput = document.querySelector('input[type="search"]');
const getSearchBtn = document.querySelector('.footer__search_button');

//----------------------function declarations-------------------
//displays list of available films 
const printFilmList = function (filmArray) {
    // const filmList = document.getElementById('filtered_movies__list');

    // filmArray.forEach(movie => {
    //     const newFilmItem = document.createElement("li");
    //     newFilmItem.classList.add('filtered_movies__item');
    //     newFilmItem.textContent = filmArray.Title;
    //     filmList.appendChild(newFilmItem);
    // })
}

const filter = function (filterWord) {
    // movies.filter( movie => movie.Title filterWord)
    // returns filtered array  of films
}

const updateFilmList = function (filterWord) {
    //calls removeAll
    //calls filter
    // and calls print_list
}

// function removeAll() {
//     const parent = document.getElementById('filtered_movies__list');
//     const child = document.getElementsByClassName('filtered_movies__item');

//     for (let i = 0; child.length > 0; i++) {
//         parent.removeChild(child[0]);
//     }
// }



// --------------------eventlisteners -----------------------
getRadioInput.forEach(item => {
    item.addEventListener('change', event => {
        const userChoice = event.target.value;
        // updateFilmList(userChoice);
    })
});

textInput.addEventListener('keypress', (event) => {
    const userChoice = textInput.value;
    if (event.keyCode === 13) {
        // updateFilmList(userChoice);
    }
});

getSearchBtn.addEventListener('click', () => {
    const userChoice = textInput.value;
    // updateFilmList(userChoice);
}); 