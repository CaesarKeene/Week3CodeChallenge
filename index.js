fetch(`http://localhost:3000/films`)
.then(res => res.json())
.then(data => {displayFilms()})

const dataLink = `http://localhost:3000/films`

