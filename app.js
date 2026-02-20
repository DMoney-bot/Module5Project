// API https://www.omdbapi.com/?apikey=57d5f13a&s

console.log("JS is working")

const container = document.getElementById("movieContainer")

fetch("https://www.omdbapi.com/?apikey=57d5f13a&s=marvel")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (!data){
            console.log("No movies Found")
            return;
        }
        
        data.Search.forEach(movie => {
            const movieBox = document.createElement("div")
            movieBox.classList.add("movie");

            movieBox.innerHTML = `
            <img src="${movie.Poster !== "N/A" ? movie.Poster : ''}"/>
            <h1>${movie.Title}</h1>
            <p>${movie.Year}</p>
            `;

            container.appendChild(movieBox)
        });
    })
    .catch(error => {
        console.error("Error fetching movies: ", error);
    })


searchBtn.addEventListener("click", () => {
    fetchMovies(searchInput.value);
});

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        fetchMovies(searchInput.value)
    }
})
