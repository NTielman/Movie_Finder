//------------global variable declarations----------------------
import { movies } from "./database.js";
const getRadioInput = document.querySelectorAll('input[type="radio"]');
const textInput = document.querySelector('input[type="search"]');
const getSearchBtn = document.querySelector('.footer__search_button');
const filmTitles = movies.map(item => item.Title);
const newFilms = movies.filter(item => item.Year >= 2014);
// const superPounds = superheroes.filter(hero => hero.weight == 200).map(hero => hero.name);
// const heroesOfDC = superheroes.filter(hero => hero.publisher === 'DC Comics');
// const weightOfDC = superheroes.filter(hero => hero.publisher === 'DC Comics').filter(hero => hero.weight !== 'unknown').map(hero => parseFloat(hero.weight));

//----------------------function declarations-------------------
//displays list of available films 
const printFilmList = function (filmArray) {

    if (filmArray) {
        //if success 
        const filmList = document.getElementById('filtered_movies__list');
        filmArray.forEach(item => {
            const newFilmItem = document.createElement("li");
            newFilmItem.classList.add('filtered_movies__item');
            newFilmItem.textContent = item.Title;
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

// returns filmarray by filterword
const filterByWord = function (filterWord) {
    const newArray = movies.filter(item => item.Title.includes(filterWord));
    return newArray;
}

const filter = function (filterWord) {
    switch (filterWord) {
        case 'new':
            return movies.filter(item => item.Year >= 2014);
        case 'avenger':
            filterWord = 'Avengers';
            return filterByWord(filterWord);
        case 'batman':
            filterWord = 'Batman';
            return filterByWord(filterWord);
        case 'xmen':
            filterWord = 'X-Men';
            return filterByWord(filterWord);
        case 'princess':
            filterWord = 'Princess';
            return filterByWord(filterWord);
        default:
            return false;
    }

    // if (array.some(element => element.Title === filterword || movies.filter(item => item.Title.toLowercase.includes(filterword)))) {
    // newArray = movies.filter(filterword);
    // return newArray
    // if array item.Title.includes(filterword) || filterword.toLowercase 
    //     console.log(array.map(element => element * 2));
    // } else {
    //
    // }
}

printFilmList(movies);

const updateFilmList = function (filterWord) {
    removeAll();
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