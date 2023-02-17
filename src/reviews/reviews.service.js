const knex = require("../db/connection");

function listCritic(criticId){
    return knex("critics")
        .select("*")
        .where({ critic_id: criticId})
        .first()
}

// Reads first review that matches reviewId
function readReviews(reviewId){
    return knex("reviews")
        .select("*")
        .where({ review_id: reviewId })
        .first()
}

// Updates review based on reviewId
function updateReview(reviewId){
    return knex("reviews")
        .select("*")
        .where({ review_id: reviewId.review_id })
        .update(reviewId, "*")
}

// Deletes review based on reviewId
async function destroy(reviewId){
    return knex("reviews")
        .where({ review_id: reviewId})
        .del()
}

module.exports = {
    listCritic,
    readReviews,
    updateReview,
    delete: destroy,
}