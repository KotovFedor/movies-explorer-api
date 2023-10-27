const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  updateUserData,
  getMyData,
} = require('../controllers/users');
const { regexForEmail } = require('../utils/constants');

router.get('/users/me', getMyData);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().pattern(regexForEmail),
  }),
}), updateUserData);

module.exports = router;
