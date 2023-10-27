
document.addEventListener('DOMContentLoaded', () => {
    const movieDetails = document.getElementById('movie-details');
    const buyTicketButton = document.getElementById('book-ticket'); 

    let currentFilm; 
    let availableTickets; 

    fetch('http://localhost:3000/films') 
        .then(response => response.json())
        .then(films => {

            currentFilm = films[0];
            availableTickets = currentFilm.capacity - currentFilm.tickets_sold;

            displayMovieDetails(currentFilm);

            buyTicketButton.addEventListener('click', () => {
                if (availableTickets > 0) {
                    availableTickets--;
                    currentFilm.tickets_sold++;
                    displayMovieDetails(currentFilm)

                    if (availableTickets === 0) {
                        buyTicketButton.textContent = 'Sold Out';
                        buyTicketButton.classList.add('sold-out');
                    }
                }
            });        

            const movieList = document.getElementById('movie-list'); 
            films.forEach(film => {
                const filmItem = document.createElement('li');
                filmItem.textContent = film.title;
                filmItem.className = 'film-item'; 
                movieList.appendChild(filmItem); 

                filmItem.addEventListener('click', () => {
                    currentFilm = film;
                    availableTickets = currentFilm.capacity - currentFilm.tickets_sold;
                    displayMovieDetails(currentFilm);

                    buyTicketButton.textContent = 'Buy Ticket';
                    buyTicketButton.classList.remove('sold-out');
                });
            });
        }) 
        .catch(error => {
            console.error('Error fetching movie data:', error);
        });

    function displayMovieDetails(film) {
        document.getElementById('movie-poster').src = film.poster; 
        document.getElementById('movie-title').textContent = film.title;
        document.getElementById('movie-description').textContent = film.description; 
        document.getElementById('movie-duration').textContent = `Runtime: ${film.runtime} minutes`;
        document.getElementById('movie-showtime').textContent = `Showtime: ${film.showtime}`;
        document.getElementById('movie-tickets').textContent = `Available Tickets: ${availableTickets}`;
    }
        
        
});
            
            




