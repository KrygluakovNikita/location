class UserError extends Error {
  status: number;
  errors: any[];
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
  static UserNotFound() {
    return new UserError(401, 'Пользователь не найден');
  }

  static EmailIsNotActivated() {
    return new UserError(401, 'Пользователь не подтвердил email');
  }

  static UniqValues() {
    return new UserError(401, 'Пользователь с таким почтовым адресом уже зарегистирован или данный никнейм уже занят');
  }

  static IncorrectPassword() {
    return new UserError(401, 'Неверный пароль');
  }

  static NotAllow() {
    return new UserError(401, 'Вы не можете взаимодейстовать с данными другого пользователя');
  }
}
export default UserError;
