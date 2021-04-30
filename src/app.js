if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const theaters = require("./theaters/theaters.router");
const movies = require("./movies/movies.router");
const reviews = require("./reviews/reviews.router");
const notFound = require("./errors/notFound");
const localError = require("./errors/localError");

app.use(express.json());
app.use(cors());
app.use("/theaters", theaters);
app.use("/movies", movies);
app.use("/reviews", reviews);
app.use(notFound);
app.use(localError);

module.exports = app;
