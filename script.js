const searchInput = document.querySelector(".search-bar");
const btnSearch = document.querySelector(".search-button");
const spanNameSearch = document.querySelector(".result-search");
const resultContainer = document.querySelector(".results-container");

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2MyOTEwNTI3NjdjMWNmYzQ5YmNhMWUxZGQ3M2VhMyIsInN1YiI6IjY2NzE1NTI1ZGI2YWQ2N2MxNDZhYWU2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Tr2jBlVnHxcyWYs1cSitZGlqLMsvFGIfB97ft9_Ra0g'
    }
};


//SEARCH MOVIES//

btnSearch.addEventListener('click', ()=>{
    searchMovies();
})
async function searchMovies(){
    spanNameSearch.innerText = searchInput.value;
    try{
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchInput.value}&include_adult=false&language=en-US&page=1`, options);
        const data = await response.json();
        divResults(data.results);
    }
    catch (error) {
        console.error('Error fetching movie data:', error);
    }
}

const divResults = (movies)=>{
    const contentResult = document.querySelector(".content-result");
    contentResult.innerHTML = " ";
    
    movies.forEach(movie =>{
        if(movie.poster_path){
            const posterDiv = document.createElement('div');
            posterDiv.className = 'poster-result';

            const img = document.createElement('img');
            img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            img.alt = movie.title;

            posterDiv.appendChild(img);
            contentResult.appendChild(posterDiv);
            console.log(movie.id);
        }

        })

}

//LATEST MOVIES//
async function lastestMovie(){
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=2024&sort_by=popularity.desc`, options);
        const data = await response.json();
        divLatest(data.results);
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
}
const divLatest = (movies)=>{
    const contentLatest = document.querySelector(".content-latest");
    movies.forEach(movie =>{
        const posterDiv = document.createElement('div');
        posterDiv.className = 'poster-result';

        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        img.alt = movie.title;

        posterDiv.appendChild(img);
        contentLatest.appendChild(posterDiv);

    })
}
lastestMovie();



//GENRE MOVIE//
const comedy = document.querySelector("[href='#COMEDY']");
const drama = document.querySelector("[href='#DRAMA']");
const action = document.querySelector("[href='#ACTION']");
const romance = document.querySelector("[href='#ROMANCE']");
const fantasy = document.querySelector("[href='#FANTASY']");
const animation = document.querySelector("[href='#ANIMATION']");

const nameGenre = document.getElementsByClassName("results-header")[2];

const fistGenre = ()=>{
    nameGenre.innerText = "Comedy";
    genresMovie("35");
}
fistGenre();
comedy.addEventListener('click', ()=>{
    nameGenre.innerText = "Comedy";
    genresMovie("35");

});
drama.addEventListener('click', ()=>{
    nameGenre.innerText = "Drama";
    genresMovie("18");

});
action.addEventListener('click', ()=>{
    nameGenre.innerText = "Action";
    genresMovie("28");

});
romance.addEventListener('click', ()=>{
    nameGenre.innerText = "Romance";
    genresMovie("10749");

});
fantasy.addEventListener('click', ()=>{
    nameGenre.innerText = "Fantasy";
    genresMovie("14");

});
animation.addEventListener('click', ()=>{
    nameGenre.innerText = "Action";
    genresMovie("16");

});
async function genresMovie(idGenre){
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${idGenre}`, options);
        const data = await response.json();
        divGenre(data.results);
        
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
}

const divGenre = (movies)=>{
    const contentGenre = document.querySelector(".content-genre");
    contentGenre.innerHTML = " ";
    movies.forEach(movie =>{
        const posterDiv = document.createElement('div');
        posterDiv.className = 'poster-result';

        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        img.alt = movie.title;

        posterDiv.appendChild(img);
        contentGenre.appendChild(posterDiv);
        console.log(movie.id);
    })
}