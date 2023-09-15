const Movie = require('../models/movie');
const { ErrorBadRequest, ErrorNotFound, ErrorForbidden } = require('../errors/errors');

const errorMessage = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movie) => res.send(movie))
    .catch((error) => next(error));
};

module.exports.postMovies = (req, res, next) => {
  const userId = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: userId,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ErrorBadRequest(errorMessage.validationErrorMessage));
      } else {
        next(error);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const id = req.params._id;
  const userId = req.user._id;

  Movie.findById(id)
    .then((removedMovie) => {
      if (!removedMovie) {
        throw new ErrorNotFound(errorMessage.movieNotFoundMessage);
      }
      if (userId !== removedMovie.owner.toString()) {
        throw new ErrorForbidden(errorMessage.forbiddenMessage);
      }
      return Movie.findByIdAndRemove(id);
    })
    .then((removedMovie) => res.send(removedMovie))
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ErrorBadRequest(errorMessage.movieBadRequestMessage));
      } else if (error.name === 'Forbidden') {
        next(new ErrorForbidden(errorMessage.forbiddenMessage));
      } else {
        next(error);
      }
    });
};
