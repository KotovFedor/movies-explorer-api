const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { regexForEmail } = require('../utils/constants');
const UnautorizedError = require('../errors/UnautorizedError');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Обязательное поле'],
      minlength: [2, 'Минимальное количество символов - 2'],
      maxlength: [30, 'Максимальное количество символов - 30'],
    },
    email: {
      type: String,
      required: [true, 'Обязательное поле'],
      unique: true,
      validate: {
        validator(email) {
          return regexForEmail.test(email);
        },
        message: 'Введите корректный email',
      },
    },
    password: {
      type: String,
      required: [true, 'Обязательное поле'],
      select: false,
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnautorizedError('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnautorizedError('Неправильные почта или пароль');
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
