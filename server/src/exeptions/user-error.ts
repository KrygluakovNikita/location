class UserError extends Error {
  status: number;
  errors: any[];
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
  
  static UserNotFound() {
    return new UserError(404, 'Пользователь не найден');
  }

}
export default UserError;
