const express = require('express');
const app = express();
// needed to register the partials
const handlebars = require('hbs');


const movies = require('./movies.json');
// console.log(movies);

app.use(express.static('public'));

handlebars.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    // const movies = <our database access>
    res.render('index', { movies: movies });
})

app.get('/godfather', (req, res) => {
    const godfather = movies.find(movie => movie.title === 'The Godfather');
    console.log(godfather);
    res.render('movie', { movie: godfather });
})


app.listen(3000);