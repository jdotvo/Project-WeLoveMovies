const knex = require("../db/connection");
const mapProperties = require('../utils/map-properties')


// Lists all possible movies in database
function listMovies(){
    return knex("movies").select("*");
}

// Lists all movies that are currently showing
function listShowingMovies(){
    return knex("movies as m")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .select("m.*")
      .where({ is_showing: true})
}

// Reads first movie that matches movieId
function readMovies(movieId){
    return knex("movies")
      .select("*")
      .where({ movie_id: movieId })
      .first()
}

// Lists theaters that are showing movie based on matching movieId
function listTheaters(movieId){
    return knex("movies as m")
      .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
      .join("theaters as t", "t.theater_id", "mt.theater_id")
      .select("t.*", "m.movie_id")
      .where({ "m.movie_id": movieId })
}

// Get critic information
function getCritics(criticId) {
    return knex("critics")
      .where({ critic_id: criticId })
  }
  
// Lists review information based on matching movieId
  function listReviews(movieId) {
    return knex("movies as m")
      .join("reviews as r", "m.movie_id", "r.movie_id")
      .where({ "m.movie_id": movieId })
  }

module.exports = {
    listMovies,
    listShowingMovies,
    readMovies,
    listTheaters,
    getCritics,
    listReviews,
}