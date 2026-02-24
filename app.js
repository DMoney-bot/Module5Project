// API http://www.omdbapi.com/?apikey=57d5f13&

console.log("JS is working")

const container = document.getElementById("movieContainer")
const ratingGroup = document.getElementById("ratingFilter")

function fetchMovies(searchTerm){

container.innerHTML = "";

fetch(`https://www.omdbapi.com/?apikey=57d5f13a&s=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
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
        });
    })
    .catch(error => {
        console.error("Error fetching movies: ", error);
    })

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
