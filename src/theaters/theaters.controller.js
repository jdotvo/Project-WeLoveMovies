const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Returns list of all theaters
async function list(req, res, next) {
  const theaters = await service.listTheaters();

  for (let theater of theaters) {
    const movieList = await service.listMoviesForTheater(theater.theater_id);
    theater["movies"] = movieList;
  }
  res.json({ data: theaters });
}

module.exports = {
  list: asyncErrorBoundary(list),
};