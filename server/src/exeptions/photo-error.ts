class PhotoError extends Error {
  status: number;
  errors: any[];
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
  static ErrorUpload() {
    return new PhotoError(401, 'Ошибка при загрузке фотографии');
  }
}
export default PhotoError;
