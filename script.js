//---------------------------- global variable declarations ------------------------------
import { movies } from "./database.js";
const getRadioInput = document.querySelectorAll('input[type="radio"]');
const getSearchInput = document.querySelector('input[type="search"]');
const getSearchBtn = document.querySelector('.footer__search-button');

//-------------------------------- function declarations ---------------------------------
//filters movie database based on filterword
const filterMovies = function (keyWord) {
    let filteredArray = [];

    // if movie-list contains titles that match keyword
    if (movies.some(item => item.Title.toLowerCase().includes(keyWord))) {
        filteredArray = movies.filter(item => item.Title.toLowerCase().includes(keyWord));
        return filteredArray;
    } else if (keyWord == 'new') { // if filtered for newest movies
        filteredArray = movies.filter(item => item.Year >= 2014);
        return filteredArray;
    } else { // if keyword not found
        return false;
    }
}

//displays list of available films
const displayMovieList = function (filmArray) {

    //if filterted movie-list exists
    if (filmArray) {
        const movieList = document.getElementById('movie-list__filtered');
        filmArray.forEach(item => {
            //create dynamic items
            const movieItem = document.createElement("li");
            const imdbLink = document.createElement("a");
            const moviePoster = document.createElement("img");

            //set attributes
            moviePoster.src = item.Poster;
            imdbLink.setAttribute("href", `https://www.imdb.com/title/${item.imdbID}/`);
            imdbLink.setAttribute("target", "_blank");
            movieItem.classList.add('movie-list__item');

            //add items to DOM
            imdbLink.appendChild(moviePoster);
            movieItem.appendChild(imdbLink);
            movieList.appendChild(movieItem);
        })
    } else { //if no results found
        const getMain = document.querySelector('.movie-list');
        const printErrorMsg = document.createElement("p");
        printErrorMsg.textContent = "no search results found";
        getMain.appendChild(printErrorMsg);
    }
}

//removes previous search-results from screen
const clearScreen = function () {
    const getMovieList = document.getElementById('movie-list__filtered');
    const getMovieItems = document.getElementsByClassName('movie-list__item');
    const getMain = document.querySelector('.movie-list');
    const getErrorMsg = document.querySelector('p');

    // if screen contains error msg
    if (getErrorMsg) {
        getMain.removeChild(getErrorMsg);
    } else { // if screen contains films  

        for (let i = 0; getMovieItems.length > 0; i++) {
            getMovieList.removeChild(getMovieItems[0]);
        }
    }
}

//updates the search results based on eventlisteners
const updateResults = function (filterWord) {
    clearScreen();
    filterWord = filterWord.toLowerCase();
    displayMovieList(filterMovies(filterWord));
}

//------------------------------------ eventlisteners ------------------------------------
getRadioInput.forEach(item => {
    item.addEventListener('change', event => {
        const userChoice = event.target.value;
        updateResults(userChoice);
    })
});

getSearchInput.addEventListener('keypress', (event) => {
    const userChoice = getSearchInput.value;
    if (event.keyCode === 13) {
        updateResults(userChoice);
    }
});

getSearchBtn.addEventListener('click', () => {
    const userChoice = getSearchInput.value;
    updateResults(userChoice);
});

//----------------------------- display initial movie list ---------------------------------
document.addEventListener('DOMContentLoaded', () => {
    displayMovieList(movies);
});