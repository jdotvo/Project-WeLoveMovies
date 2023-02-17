const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Returns list of either all movies or all showing movies
async function list(req, res){
    let movieList;
    const { is_showing } = req.query;

    if (is_showing === "true"){
       movieList = await service.listShowingMovies()
       movieList = movieList.splice(0, 15)
    } else {
       movieList = await service.listMovies()
    }

    res.json({ data: movieList });
}

// Checks to see if movie exists, otherwise throw error
async function movieExists(req, res, next) {
    const movie = await service.readMovies(req.params.movieId);
    if (movie) {
      res.locals.movie = movie;
      return next();
    }
    return next({ 
        status: 404, 
        message: "Movie cannot be found." 
    });
  }

// Handler function for read
async function readMovies(req, res){
    const { movie: data } = res.locals;
    res.json({ data }); 
}

// Returns list of all theaters showing requested movieId
async function listTheaters(req, res){
    const { movieId } = req.params;
    let theaters = await service.listTheaters(movieId);
    res.json({ data: theaters });
}

// Returns list of all reviews for requested movieId
async function listReviews(req, res) {
    const movieId = res.locals.movie.movie_id;
    const reviews = await service.listReviews(movieId);
    const allReviews = [];
    for (let i = 0; i < reviews.length; i++) {
      const review = reviews[i];
      const critic = await service.getCritics(review.critic_id);
      review.critic = critic[0];
      allReviews.push(review);
    }
    res.status(200).json({ data: allReviews });
  }

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readMovies)],
    listTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listTheaters)],
    listReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listReviews)]
}