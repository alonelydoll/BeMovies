const searchInput = document.querySelector(".search-bar");
const btnSearch = document.querySelector(".search-button");
const spanNameSearch = document.querySelector(".result-search");
const resultContainer = document.querySelector(".results-container");

//SWIPER//
let swiper = new Swiper(".latest-release.swiper", {
    direction: 'horizontal',
    loop: true,
    spaceBetween:19,
    slidesPerView: 1,
    slidesPerGroup: 1,
    breakpoints: {
        500:{
            slidesPerView:2,
        },
        768:{
            slidesPerView:3,
        },
        1250: {
            slidesPerView:4,
        },
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    grabCursor: true,
}); 

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlM2MyOTEwNTI3NjdjMWNmYzQ5YmNhMWUxZGQ3M2VhMyIsInN1YiI6IjY2NzE1NTI1ZGI2YWQ2N2MxNDZhYWU2YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Tr2jBlVnHxcyWYs1cSitZGlqLMsvFGIfB97ft9_Ra0g'
    }
};
//GENRE//
/* const genre= (array)=>{
    let nomGenre = "";
    array.forEach(id=>{
        if(id === 28){
            nomGenre = "Action";
        }else if (id === 12){
            nomGenre = "Adventure";
        }else if (id === 16){
            nomGenre = "Animation";
        }else if (id === 35){
            nomGenre = "Comedy";
        }else if (id === 80){
            nomGenre = "Crime";
        }else if (id === 99){
            nomGenre = "Documentary";
        }else if (id === 18){
            nomGenre = "Drama";
        }else if (id === 10751){
            nomGenre = "Family";
        }else if (id === 14){
            nomGenre = "Fantasy";
        }else if (id === 36){
            nomGenre = "History";
        }else if (id === 27){
            nomGenre = "Horor";
        }else if (id === 10402){
            nomGenre = "Music";
        }else if (id === 9648){
            nomGenre = "Mystery";
        }else if (id === 10749){
            nomGenre = "Romance";
        }else if (id === 878){
            nomGenre = "Science Fiction";
        }else if (id === 10770){
            nomGenre = "TV Movie";
        }else if (id === 53){
            nomGenre = "Thriller";
        }else if (id === 10752){
            nomGenre = "War";
        }else if (id === 37){
            nomGenre = "Western";
        }
        return nomGenre;
    })
} */

//HOVER//
const hover = (movie, imgElement)=>{
    const hoverDiv = document.createElement('div');
    hoverDiv.className = 'movie';
    hoverDiv.style.zIndex = "1";
    hoverDiv.style.opacity = "90%";
            hoverDiv.style.display = "none";
            hoverDiv.style.gap = "10px"
            hoverDiv.style.alignItems = "center";
            hoverDiv.style.backgroundColor ="black"

            const title = document.createElement('span');
            title.innerText = movie.title;
            title.className = "movie-title";

            const year = document.createElement('span');
            year.innerText = (movie.release_date).slice(0,4);
            year.className = "movie-year";

            const genre = document.createElement('span');
            genre.innerText = movie.genre_ids;
            genre.className ="movie-genre";

            const rating = document.createElement('span');
            rating.innerText = movie.vote_average.toFixed(1);
            rating.className = "movie-rating";

            const star = document.createElement('img');
            star.src = "star.png";
            star.style.width = "32px";

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
    const contentResult = document.querySelector(".results-container .swiper-wrapper");
    contentResult.innerHTML = " ";
    
    movies.forEach(movie =>{
        if(movie.poster_path){
            //hover
            const divSwiper = document.createElement('div');
            divSwiper.className = "swiper-slide";
            
            const imgElement = document.createElement('a');
            imgElement.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`;
            imgElement.className = 'poster-result';
            

            contentResult.appendChild(divSwiper);
            divSwiper.appendChild(imgElement);

            hover(movie, imgElement);

            //modal
            imgElement.addEventListener('click', ()=>{
                document.querySelector(".modal").style.display = "block";
                document.querySelector('[alt="The Godfather"]').src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                document.getElementsByClassName("modal-title")[0].innerText = movie.title;
                document.querySelector(".modal-genre-year").innerText = (movie.release_date).slice(0,4);
                document.getElementsByClassName("modal-title")[1].innerHTML = '<img src="star.png" alt=""></img>' + (movie.vote_average).toFixed(1);
                document.getElementsByClassName("modal-text")[0].innerText = movie.overview;
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
    const contentLatest = document.querySelector(".latest-release .swiper-wrapper");
    contentLatest.innerHTML = " ";

    movies.forEach(movie =>{
        //hover//
        const divSwiper = document.createElement('div');
        divSwiper.className = 'swiper-slide';

        const imgElement = document.createElement('a');
            imgElement.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`;
            imgElement.className = 'poster-result';

            contentLatest.appendChild(divSwiper);
            divSwiper.appendChild(imgElement)

            hover(movie, imgElement);

        
        //Modal//
            imgElement.addEventListener('click', ()=>{
                document.querySelector(".modal").style.display = "block";
                document.querySelector('[alt="The Godfather"]').src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                document.getElementsByClassName("modal-title")[0].innerText = movie.title;
                document.querySelector(".modal-genre-year").innerText = (movie.release_date).slice(0,4);
                document.getElementsByClassName("modal-title")[1].innerHTML = '<img src="star.png" alt=""></img>' + (movie.vote_average).toFixed(1);
                document.getElementsByClassName("modal-text")[0].innerText = movie.overview;
                

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

const firstGenre = ()=>{
    nameGenre.innerText = "Comedy";
    comedy.style.backgroundColor = "red";
    genresMovie("35");
}
firstGenre();
comedy.addEventListener('click', ()=>{
    nameGenre.innerText = "Comedy";
    comedy.style.backgroundColor = "red";
    genresMovie("35");

});
drama.addEventListener('click', ()=>{
    nameGenre.innerText = "Drama";
    drama.style.backgroundColor = "red";
    genresMovie("18");

});
action.addEventListener('click', ()=>{
    nameGenre.innerText = "Action";
    action.style.backgroundColor = "red";
    genresMovie("28");

});
romance.addEventListener('click', ()=>{
    nameGenre.innerText = "Romance";
    romance.style.backgroundColor = "red";
    genresMovie("10749");

});
fantasy.addEventListener('click', ()=>{
    nameGenre.innerText = "Fantasy";
    fantasy.style.backgroundColor = "red";
    genresMovie("14");

});
animation.addEventListener('click', ()=>{
    animation.style.backgroundColor = "red";
    nameGenre.innerText = "Animation";
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
    const contentGenre = document.querySelector(".genre .swiper-wrapper");
    contentGenre.innerHTML = " ";
    movies.forEach(movie =>{
        //hover//
        const divSwiper = document.createElement('div');
        divSwiper.className = 'swiper-slide';

        const imgElement = document.createElement('a');
            imgElement.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`;
            imgElement.className = 'poster-result';

            contentGenre.appendChild(divSwiper);
            divSwiper.appendChild(imgElement);

            hover(movie, imgElement);

            //modal//
            imgElement.addEventListener('click', ()=>{
                document.querySelector(".modal").style.display = "block";
                document.querySelector('[alt="The Godfather"]').src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                document.getElementsByClassName("modal-title")[0].innerText = movie.title;
                document.querySelector(".modal-genre-year").innerText = (movie.release_date).slice(0,4);
                document.getElementsByClassName("modal-title")[1].innerHTML = '<img src="star.png" alt=""></img>' + (movie.vote_average).toFixed(1);
                document.getElementsByClassName("modal-text")[0].innerText = movie.overview;

                

            })
            document.querySelector(".close-modal").addEventListener('click', ()=>{
                document.querySelector(".modal").style.display = "none";
            })
    })
}


