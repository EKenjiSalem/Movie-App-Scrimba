const btn = document.getElementById('btn');

btn.addEventListener('click', function() {
    const searchInput = document.getElementById('searchInput').value;

    if (searchInput === '') {
        displayError('Please type in a movie');
        return;
    }

    fetch(`http://www.omdbapi.com/?apikey=beb22ab6&s=${searchInput}`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                displayMovies(data.Search);
            } else {
                displayError(data.Error);
            }
        })

    function displayMovies(movies) {
        const movieDataContainer = document.querySelector('.movie-data');
        movieDataContainer.innerHTML = '';

        movies.forEach(movie => {
            const movieDetailsUrl = `http://www.omdbapi.com/?apikey=beb22ab6&i=${movie.imdbID}&plot=full&r=json`;

            fetch(movieDetailsUrl)
                .then(response => response.json())
                .then(details => {
                    const movieElement = document.createElement('div');
                    movieElement.classList.add('movie-container');
                    movieElement.innerHTML = `
                        <div class="movie-info">
                            <h2>${details.Title}</h2>
                            <p><strong>Year:</strong> ${details.Year}</p>
                            <p><strong>Genre:</strong> ${details.Genre}</p>
                            <div class="plus-icon" onclick="addToWatchlist('${details.imdbID}')">
                                <i class="fa-solid fa-circle-plus"></i>
                                <p><strong>Watchlist</strong></p>
                            </div>
                            <img src="${details.Poster}" alt="${details.Title} Poster">
                            <p class="plot"> ${details.Plot}</p>
                        </div>
                    `;
                    movieDataContainer.appendChild(movieElement);
                })
                .catch(error => {
                    console.error('Error fetching movie details:', error);
                });
        });
    }

  function displayError(errorMessage) {
    const movieDataContainer = document.querySelector('.movie-data');
     movieDataContainer.innerHTML = `<p>${errorMessage}</p>`;
  }
});

  function addToWatchlist(imdbID) {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
     if (!watchlist.includes(imdbID)) {
        watchlist.push(imdbID);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }
}




