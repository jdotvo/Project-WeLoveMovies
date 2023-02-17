const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Checks to see if review exists, otherwise throw error
async function reviewExists(req, res, next) {
    const review = await service.readReviews(req.params.reviewId);
    if (review) {
      res.locals.review = review;
      return next();
    }
    return next({ 
        status: 404, 
        message: "Review cannot be found." 
    });
}

// Handler function for read
async function readReviews(req, res){
    const { review: data } = res.locals;
    res.json({ data }); 
}

// Handle function for update
async function updateReview(req, res) {
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
        review_id: res.locals.review.review_id,
    }
    await service.updateReview(updatedReview);
    updatedReview.critic = await service.listCritic(updatedReview.critic_id);
    res.json({ data: updatedReview })
}

// Handler function for delete
async function destroy(req, res) {
    const { review } = res.locals
    await service.delete(review.review_id)
    res.sendStatus(204)
}

  module.exports = {
    read: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(readReviews)],
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(updateReview)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  }