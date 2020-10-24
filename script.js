//------------global variable declarations----------------------
import { movies } from "./database.js";
const getRadioInput = document.querySelectorAll('input[type="radio"]');
const textInput = document.querySelector('input[type="search"]');
const getSearchBtn = document.querySelector('.footer__search_button');

//----------------------function declarations-------------------
//displays list of available films 
const printFilmList = function (filmArray) {

    if (filmArray) {
        //if success 
        // insert image poster and link to imdb
        const filmList = document.getElementById('filtered_movies__list');
        filmArray.forEach(item => {
            const newFilmItem = document.createElement("li");
            const imdbLink = document.createElement("a");
            imdbLink.setAttribute("href", `https://www.imdb.com/title/${item.imdbID}/`);
            imdbLink.setAttribute("target", "_blank");
            const filmPoster = document.createElement("img");
            filmPoster.src = item.Poster;
            imdbLink.appendChild(filmPoster);
            newFilmItem.classList.add('filtered_movies__item');
            newFilmItem.appendChild(imdbLink);
            filmList.appendChild(newFilmItem);
        })
    } else {
        //if fail
        const main = document.querySelector('.filtered_movies');
        const printMessage = document.createElement("p");
        printMessage.textContent = "no search results found";
        main.appendChild(printMessage);
    }

}

//clears the screen
const removeAll = function () {
    const parent1 = document.querySelector('.filtered_movies');
    const child1 = document.querySelector('p');

    const parent = document.getElementById('filtered_movies__list');
    const child = document.getElementsByClassName('filtered_movies__item');

    for (let i = 0; child.length > 0; i++) {
        parent.removeChild(child[0]);
    }

    if (child1) {
        parent1.removeChild(child1);
    }
}

const filter = function (filterWord) {
    let newA = [];

    if (movies.some(item => item.Title.toLowerCase().includes(filterWord))) {
        newA = movies.filter(item => item.Title.toLowerCase().includes(filterWord));
        return newA;
    } else if (filterWord == 'new') {
        return movies.filter(item => item.Year >= 2014);
    } else if (filterWord === 'xmen') { // without -
        return movies.filter(item => item.Title.includes('X-Men'));
    } else { // if word not found
        return false;
    }
}

printFilmList(movies);

const updateFilmList = function (filterWord) {
    removeAll();
    filterWord = filterWord.toLowerCase();
    printFilmList(filter(filterWord));
}

// --------------------eventlisteners -----------------------
getRadioInput.forEach(item => {
    item.addEventListener('change', event => {
        const userChoice = event.target.value;
        updateFilmList(userChoice);
    })
});

textInput.addEventListener('keypress', (event) => {
    const userChoice = textInput.value;
    if (event.keyCode === 13) {
        updateFilmList(userChoice);
    }
});

getSearchBtn.addEventListener('click', () => {
    const userChoice = textInput.value;
    updateFilmList(userChoice);
}); 