class ApiError extends Error {
  
  /**
   * 
   * @param {number} statusCode 
   * @param {string} message 
   * @param {[]} errors 
   * @param {string} stack 
   */
  constructor(
    statusCode = 500,
    message = "Something went wrong!",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
