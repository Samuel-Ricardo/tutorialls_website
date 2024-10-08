import { AppError } from '../app.error';

export class InvalidCredentials extends AppError {
  constructor(
    public message: string = 'Invalid Credentials',
    public status: number = 401,
    public data?: any,
    public error: boolean = true,
  ) {
    super(message, status, data, error);
  }
}
