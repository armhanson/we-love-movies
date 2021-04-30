const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

function list(isShowing) {
  if (isShowing) {
    return knex("movies as m")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .distinct("mt.movie_id")
      .select("m.*")
      .where({ is_showing: true });
  }
  return knex("movies").select("*");
}

function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

function readMovie(movieId) {
  return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .where({ movie_id: movieId })
    .then((response) => {
      return Promise.all(response.map(addCritic));
    });
}

module.exports = {
  list,
  read,
  readMovie,
};
