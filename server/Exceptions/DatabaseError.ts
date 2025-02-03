import { StatusCodes } from "http-status-codes";

class DatabaseError extends Error {
  code: number;

  constructor(message = "Database operation failed") {
    super(message);
    this.name = "DatabaseError";
    this.code = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

export default DatabaseError;
