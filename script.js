const searchInput = document.querySelector(".search-bar");
const btnSearch = document.querySelector(".search-button");
const spanNameSearch = document.querySelector(".result-search");
const resultContainer = document.querySelector(".results-container");

//SWIPER//
const swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2MyOTEwNTI3NjdjMWNmYzQ5YmNhMWUxZGQ3M2VhMyIsInN1YiI6IjY2NzE1NTI1ZGI2YWQ2N2MxNDZhYWU2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Tr2jBlVnHxcyWYs1cSitZGlqLMsvFGIfB97ft9_Ra0g'
    }
};

//HOVER//
const hover = (movie, imgElement)=>{
    const hoverDiv = document.createElement('div');
    hoverDiv.className = 'movie';
    hoverDiv.style.zIndex = "1";
    hoverDiv.style.opacity = "90%";
            hoverDiv.style.display = "none";
            hoverDiv.style.alignItems = "center";
            hoverDiv.style.gap = "20px";
            hoverDiv.style.backgroundColor ="black"

            const title = document.createElement('span');
            title.innerText = movie.title;
            title.className = "movie-title";

            const year = document.createElement('span');
            year.innerText = movie.release_date;
            year.className = "movie-year";

            const genre = document.createElement('span');
            genre.innerText = movie.genre_ids;
            genre.className ="movie-genre";

            const rating = document.createElement('span');
            rating.innerText = movie.vote_average.toFixed(1);
            rating.className = "movie-rating";

            const star = document.createElement('img');
            star.src = "star.png";

            imgElement.appendChild(hoverDiv);
            hoverDiv.appendChild(title);
            hoverDiv.appendChild(year);
            hoverDiv.appendChild(genre);
            hoverDiv.appendChild(star);
            hoverDiv.appendChild(rating);

            imgElement.addEventListener('mouseover', ()=>{
                hoverDiv.style.display = "flex";

                imgElement.addEventListener('mouseleave', ()=>{
                    hoverDiv.style.display = "none";
                })
            })
}

//SEARCH MOVIES//
resultContainer.style.display = "none";
btnSearch.addEventListener('click', ()=>{
    resultContainer.style.display = "block";
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
            //hover
            const imgElement = document.createElement('a');
            imgElement.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`;
            imgElement.className = 'poster-result';

            contentResult.appendChild(imgElement);

            hover(movie, imgElement);

            //modal
            imgElement.addEventListener('click', ()=>{
                document.querySelector(".modal").style.display = "block";
                document.querySelector('.modal-image').src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                document.getElementsByClassName("modal-title")[0] = movie.title;
                document.querySelector(".modal-genre-year") = (movie.release_date).getFullYear();
                document.getElementsByClassName("modal-title")[1] = (movie.vote_average).toFixed(1);
                // document.querySelector(".modal-genre") = movie.gen
                document.getElementsByClassName("modal-text")[0] = movie.overview;

            })
            document.querySelector(".close-modal").addEventListener('click', ()=>{
                document.querySelector(".modal").style.display = "none";
            })
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
        //hover//
        const imgElement = document.createElement('a');
            imgElement.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`;
            imgElement.className = 'poster-result';

            contentLatest.appendChild(imgElement);

            hover(movie, imgElement);

        
        //Modal//
            imgElement.addEventListener('click', ()=>{
                document.querySelector(".modal").style.display = "block";
                document.querySelector('.modal-image').src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                document.getElementsByClassName("modal-title")[0] = movie.title;
                document.querySelector(".modal-genre-year") = (movie.release_date).getFullYear();
                document.getElementsByClassName("modal-title")[1] = (movie.vote_average).toFixed(1);
                // document.querySelector(".modal-genre") = movie.gen
                document.getElementsByClassName("modal-text")[0] = movie.overview;

        })
        document.querySelector(".close-modal").addEventListener('click', ()=>{
            document.querySelector(".modal").style.display = "none";
        })
        

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
        //hover//
        const imgElement = document.createElement('a');
            imgElement.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`;
            imgElement.className = 'poster-result';

            contentGenre.appendChild(imgElement);

            hover(movie, imgElement);

            //modal//
            imgElement.addEventListener('click', ()=>{
                document.querySelector(".modal").style.display = "block";
                document.querySelector('.modal-image').src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                document.getElementsByClassName("modal-title")[0] = movie.title;
                document.querySelector(".modal-genre-year") = (movie.release_date).getFullYear();
                document.getElementsByClassName("modal-title")[1] = (movie.vote_average).toFixed(1);
                // document.querySelector(".modal-genre") = movie.gen
                document.getElementsByClassName("modal-text")[0] = movie.overview;

            })
            document.querySelector(".close-modal").addEventListener('click', ()=>{
                document.querySelector(".modal").style.display = "none";
            })
    })
}


