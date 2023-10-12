const errorMessage = {
  userNotFoundMessage: 'Ошибка получения пользователя с некорректным id',
  userBadRequestMessage: 'Ошибка получения пользователя с несуществующим в Базе Данных id',
  movieBadRequestMessage: 'Ошибка получения фильма с несуществующим в Базе Данных id',
  validationErrorMessage: 'Пожалуйста, проверьте правильность введенных данных',
  movieNotFoundMessage: 'Ошибка получения фильма с некорректным id',
  unauthorizedErrorMessage: 'Что-то не так при аутентификации или авторизации',
  needAuthorizationMessage: 'Необходима авторизация',
  defaultNotFoundMessage: 'Страница не найдена',
  conflictingRequestMessage: 'Пользователь с таким Email уже существует',
  forbiddenMessage: 'Недостаточно прав для осуществелния данного действия',
};

module.exports = errorMessage;
