const knex = require("../db/connection");

async function attachCritic(review) {
  review.critic = await knex("critics as c")
    .where({
      "c.critic_id": review.critic_id,
    })
    .first();
  return review;
}

function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId });
}

function destroy(reviewId) {
	return knex("reviews")
		.where({ review_id: reviewId })
		.del();
}

function update(review) {
  return knex("reviews as r")
    .where({ "r.review_id": review.review_id })
    .update(review, "*")
    .then(() => Promise.resolve(attachCritic(review)));
}

function readCritic(criticId) {
  return knex("critics").select("*").where({ critic_id: criticId }).first();
}

function readReviews(movieId) {
  return knex("reviews").select("*").where({ movie_id: movieId });
}

module.exports = {
  delete: destroy,
  read,
  update,
  readCritic,
  readReviews,
};
