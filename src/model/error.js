export default class AppError extends Error {
    constructor(key, message) {
      const formattedKey = key ? `${key}: ` : "";
      super(`${formattedKey}${message}`);
      this.name = `AppError`;
    }
}