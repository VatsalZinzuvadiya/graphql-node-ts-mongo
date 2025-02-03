import { StatusCodes } from "http-status-codes";

class UnauthorizedError extends Error {
  code: number;

  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
    this.code = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthorizedError;
