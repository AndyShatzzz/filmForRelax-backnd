const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET, KEY_PASSWORD } = require('../utils/config');
const { ErrorNotFound, ErrorConflictingRequest, ErrorBadRequest } = require('../errors/errors');

const errorMessage = require('../utils/constants');

module.exports.getUserInfo = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(new ErrorNotFound(errorMessage.userNotFoundMessage));
      } else {
        res.send(user);
      }
    })
    .catch((error) => next(error));
};

module.exports.patchUserInfo = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;

  User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
    .then((updateUser) => {
      if (!updateUser) {
        next(new ErrorNotFound(errorMessage.userNotFoundMessage));
      } else {
        res.send(updateUser);
      }
    })
    .catch((error) => next(error));
};

module.exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    }))
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        email: user.email,
        name: user.name,
      });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ErrorBadRequest(errorMessage.validationErrorMessage));
      } else if (error.code === 11000) {
        next(new ErrorConflictingRequest(errorMessage.conflictingRequestMessage));
      } else {
        next(error);
      }
    });
};

module.exports.signIn = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({ token: jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : KEY_PASSWORD, { expiresIn: '7d' }) });
    })
    .catch((error) => next(error));
};
