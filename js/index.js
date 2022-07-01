'use strict'

const elMovieList = document.querySelector(".movie__list");
const elResult = document.querySelector(".movie__result-num");
const elSelect = document.querySelector(".select");
const elForm = document.querySelector(".form");
const elBookmark = document.querySelector('.bookmark-list');


elResult.textContent = films.length;

let bookmarks = [];
const renderMovies = function (filmsArr, htmlElement) {

  filmsArr.forEach((movie) => {
    //CREATE ELEMENT
    const newLi = document.createElement("li");
    const newImg = document.createElement("img");
    const newDiv = document.createElement("div");
    const newTitle = document.createElement("h5");
    const newLanguage = document.createElement("p");
    const newYear = document.createElement("p");
    const newButton = document.createElement("a");
    const newBookmarkBtn = document.createElement("button")

    //SET ATTTIBUTE
    newLi.setAttribute("class", "card mb-3");
    newLi.style.width = "18rem";
    newImg.classList.add("card-img-top");
    newImg.setAttribute("src", movie.poster);
    newDiv.classList.add("card-body");
    newTitle.classList.add("card-title");
    newLanguage.classList.add("card-text");
    newYear.classList.add("card-text");
    newButton.setAttribute("class", "btn btn-danger");
    newBookmarkBtn.setAttribute("class", "btn btn-primary bookmarkBtn");

    newBookmarkBtn.dataset.bookmarkId = movie.id;





    newBookmarkBtn.textContent = "Bookmark";


    newTitle.textContent = movie.title;
    // newLanguage.textContent = movie.overview;
    newYear.textContent = movie.year;
    newButton.textContent = "Watch Trailer";
    const genresList = document.createElement("ul");


    movie.genres.forEach((genre) => {

      const genresItem = document.createElement("li");

      genresItem.textContent = genre;
      genresList.appendChild(genresItem);
    })

    //APPEND
    htmlElement.appendChild(newLi);
    newLi.appendChild(newImg);
    newLi.appendChild(newDiv);
    newDiv.appendChild(newTitle);
    // newDiv.appendChild(newLanguage);
    newDiv.appendChild(newYear);
    newDiv.appendChild(newButton);

    newLi.appendChild(newBookmarkBtn);
  });

}
const renderGenres = function (arr) {

  const uniqueGenre = [];

  arr.forEach((film) => {
    film.genres.forEach((genre) => {
      if (!uniqueGenre.includes(genre)) {
        uniqueGenre.push(genre);
      }
    })
  })
  uniqueGenre.forEach((genre) => {
    const genreOption = document.createElement("option");

    genreOption.textContent = genre;
    genreOption.value = genre;

    elSelect.appendChild(genreOption);
  })
}



const renderBookmark = function (bookArr, htmlElement) {
  bookArr.forEach((bookmarkArr) => {
    const itemBookmark = document.createElement("li");
    const newDeleteBtn = document.createElement("button");

    itemBookmark.textContent = bookmarkArr.title;
    newDeleteBtn.textContent = "Delete";
    newDeleteBtn.setAttribute("class", "bookmark-delete btn btn-danger ms-3");

    newDeleteBtn.dataset.bookmarkDeleteId = bookmarkArr.id;

    
    htmlElement.appendChild(itemBookmark);
    itemBookmark.appendChild(newDeleteBtn);
    
  })
}

elMovieList.addEventListener('click', function (evt) {
  if (evt.target.matches('.bookmarkBtn')) {

    
    let bookmarkId = evt.target.dataset.bookmarkId;
    let bookmarkElement = films.find(item => item.id === bookmarkId);

    if (!bookmarks.includes(bookmarkElement)) {
      bookmarks.push(bookmarkElement);
      elBookmark.innerHTML = null;
      renderBookmark(bookmarks, elBookmark)
    }
  }
})


renderMovies(films, elMovieList);
renderGenres(films);

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  elMovieList.innerHTML = null;

  const selectedGenre = elSelect.value;
  const filteredFilms = [];

  films.forEach(film => {
    if (selectedGenre === "all" || film.genres.includes(selectedGenre)) {
      filteredFilms.push(film);
    }
  })

  renderMovies(filteredFilms, elMovieList);
});



