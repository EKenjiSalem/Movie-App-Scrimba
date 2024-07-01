document.addEventListener('DOMContentLoaded', () => {
    const movieDataContainer = document.querySelector('.movie-data');
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    if (watchlist.length === 0) {
        movieDataContainer.innerHTML = '<p class="empty">Your watchlist is empty.</p>';
        } else {
        watchlist.forEach(imdbID => {
            const movieDetailsUrl = `http://www.omdbapi.com/?apikey=beb22ab6&i=${imdbID}&plot=full&r=json`;

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
                            <img src="${details.Poster}" alt="${details.Title} Poster">
                            <p class="plot"> ${details.Plot}</p>
                            <div class="remove-icon" onclick="removeFromWatchlist('${details.imdbID}')">
                                <i class="fa-solid fa-circle-minus"></i>
                                <p><strong>Remove</strong></p>
                            </div>
                        </div>
                        `;
                 movieDataContainer.appendChild(movieElement);
                })
              });
            }
         });

    function removeFromWatchlist(imdbID) {
      let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        watchlist = watchlist.filter(id => id !== imdbID);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        location.reload(); 
    }
