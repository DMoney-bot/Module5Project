// API http://www.omdbapi.com/?apikey=57d5f13&

console.log("JS is working")

const container = document.getElementById("movieContainer")
const ratingGroup = document.getElementById("ratingFilter")

function fetchMovies(searchTerm){

    const load = document.querySelector('.loadingState')
    load.classList.add("loadingStateVisible")

    container.innerHTML = "";

    setTimeout(() => {

        fetch(`https://www.omdbapi.com/?apikey=57d5f13a&s=${searchTerm}`)
            .then(response => response.json())
            .then(data => {            
                if (!data){
                    console.log("No movies Found")
                    return;
                }
            
                data.Search.forEach(movie => {
                    fetch(`https://www.omdbapi.com/?apikey=57d5f13a&i=${movie.imdbID}`)
                        .then(res => res.json())
                        .then(fullMovie => {
                            const rating = Math.round(fullMovie.imdbRating / 2)
                            const selectedRating = document.getElementById("ratingFilter").value;
                            console.log("dropdown value: ", ratingFilter.value);
    
                            if (rating < selectedRating) return;                    
                            const movieBox = document.createElement("div");
                            movieBox.classList.add("movie");
    
                            movieBox.innerHTML = `
                            <img src="${fullMovie.Poster}">
                            <h3>${fullMovie.Title}</h3>
                            <p>⭐${rating}/5</p>
                            `;
    
                            container.appendChild(movieBox);
                        })
                        load.classList.remove("loadingStateVisible")
                });
            })
            .catch(error => {
                load.classList.remove("loadingStateVisible");
                console.error(error);
            })
    }, 2000);

}

fetchMovies("");

ratingFilter.addEventListener("change", () => {
    fetchMovies(searchInput.value || "marvel");
});

searchBtn.addEventListener("click", () => {
    fetchMovies(searchInput.value);
});

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        fetchMovies(searchInput.value)
    }
})


function loading(event) {
    event.preventDefault();

    const load = document.querySelector('.loadingState')
    load.classList.add("loadingStateVisible");

    setTimeout(() => {
        load.classList.remove(".loadingStateVisible")
        console.log('it worked')
    }, 5000);
}
