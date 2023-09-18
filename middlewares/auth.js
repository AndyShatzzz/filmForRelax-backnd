const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET, KEY_PASSWORD } = require('../utils/config');

const { UnauthorizedError } = require('../errors/errors');

const errorMessage = require('../utils/constants');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(errorMessage.needAuthorizationMessage));
    return;
  }
  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : KEY_PASSWORD);
  } catch (error) {
    next(new UnauthorizedError(errorMessage.needAuthorizationMessage));
  }

  req.user = payload;

  next();
};

module.exports = auth;
