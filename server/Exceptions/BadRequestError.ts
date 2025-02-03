import { StatusCodes } from "http-status-codes";

class BadRequestError extends Error {
  code: number;

  constructor(message: string) {
    super(message);
    this.name = "BadRequestError";
    this.code = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError;
