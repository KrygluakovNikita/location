class UserError extends Error {
  status: number;
  errors: any[];
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
  static UserNotFound() {
    return new UserError(406, 'Пользователь не найден');
  }

  static EmailIsNotActivated() {
    return new UserError(400, 'Пользователь не подтвердил email');
  }

  static UniqValues() {
    return new UserError(400, 'Пользователь с таким почтовым адресом уже зарегистирован или данный никнейм уже занят');
  }

  static IncorrectPassword() {
    return new UserError(400, 'Неверный пароль');
  }

  static NotAllow() {
    return new UserError(403, 'Вы не можете взаимодейстовать с данными другого пользователя');
  }

  static GoogleUser() {
    return new UserError(403, 'Данное действие запрещено пользователю создавшему аккаунт через гугл');
  }

  static GoogleAuth() {
    return new UserError(403, 'Вы зарегистировались через гугл. Используйте авторизацию через гугл');
  }
}
export default UserError;
