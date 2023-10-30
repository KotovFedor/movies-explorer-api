const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');
const { regexForUrl } = require('../utils/constants');

router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    description: Joi.string().required(),
    year: Joi.string().required(),
    image: Joi.string().required().pattern(regexForUrl),
    trailerLink: Joi.string().required().pattern(regexForUrl),
    thumbnail: Joi.string().required().pattern(regexForUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

router.get('/movies', getMovies);

router.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = router;
