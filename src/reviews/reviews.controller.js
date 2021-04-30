const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewIdValidation(req, res, next) {
  const { reviewId } = req.params;
  console.log(reviewId)
  const review = await service.read(reviewId);

  if (review.length) {
    res.locals.review = review;
    return next();
  }
  next({
    status: 404,
    message: "Review cannot be found.",
  });
}

async function requestValidation(req, res, next) {
  const { data } = req.body;

  if (!data.content && !data.score) {
    next({
      status: 400,
      mesage: "Properties invalid!!!",
    });
  }
  res.locals.updated = data;
  return next();
}

async function update(req, res) {
  const reviewData = {
    ...res.locals.review[0],
    ...res.locals.updated,
  };

  const data = await service.update(reviewData);

  res.json({ data: data });
}

async function read(req, res) {
  const reviews = await service.read(res.locals.movie.movie_id);

  for (let review of reviews) {
    const critic = await service.readCritic(review.critic_id);

    review["critic"] = critic;
  }

  res.json({ data: reviews });
}

async function destroy(req, res) {
  await service.delete(res.locals.review[0].review_id);
  res.sendStatus(204);
}

module.exports = {
  update: [
    asyncErrorBoundary(reviewIdValidation),
    asyncErrorBoundary(requestValidation),
    update,
  ],
  read,
  delete: [asyncErrorBoundary(reviewIdValidation), asyncErrorBoundary(destroy)],
};
