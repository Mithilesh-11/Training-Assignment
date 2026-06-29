export abstract class AppError extends Error {
  public abstract status: number;
  public abstract code: string;

  constructor(message: string) {
    super(message);
     this.name = this.constructor.name
  }
}

// 2. Extend the base class for specific HTTP scenarios
export class ValidationError extends AppError {
  public status = 400;
  public code: string;

  constructor(message: string, code = "VALIDATION_ERROR") {
    super(message);
    this.name = "ValidationError";
    this.code = code; 
}
}

export class NotFoundError extends AppError {
  public status = 404;
  public code: string;

  constructor(message: string, code = "NOT_FOUND") {
    super(message);
    this.name = "NotFoundError";
    this.code = code; 
  }
}

export class ConflictError extends AppError {
  public status = 409;
  public code: string;

  constructor(message: string, code = "CONFLICT") {
    super(message);
    this.name = "ConflictError";
    this.code = code; 
  }
}

export class InternalServerError extends AppError {
  public status = 500;
  public code = "INTERNAL_SERVER_ERROR";

  constructor(message = "An unexpected error occurred while processing the request.") {
    super(message);
    this.name = "InternalServerError";
  }
}
