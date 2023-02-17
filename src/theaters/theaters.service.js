const knex = require("../db/connection");

// Lists all theaters
function listTheaters(){
    return knex("theaters").select("*");
}

// Lists movies playing at requested theaterId
function listMoviesForTheater(theaterId){
    return knex("movies_theaters as mt")
        .join("movies as m", "m.movie_id", "mt.movie_id")
        .where({ "theater_id": theaterId })
        .select("m.*", "mt.is_showing", "mt.theater_id");
}

module.exports = { 
    listTheaters, 
    listMoviesForTheater,
}