class ApiError extends Error {
  status: number;
  errors: any[];
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, 'Пользователь не авторизован');
  }

  static InvalidToken() {
    return new ApiError(401, 'Неверный токен доступа');
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }

  static AccessDenied() {
    return new ApiError(403, 'У вас недостаточно прав!');
  }

  static NotFound() {
    return new ApiError(404, 'Данные к которым вы обращаетесь не найдены');
  }

  static ServerError() {
    return new ApiError(500, 'Ошибка на стороне сервера');
  }
}
export default ApiError;
