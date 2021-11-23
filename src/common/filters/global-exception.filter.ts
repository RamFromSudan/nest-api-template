import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorDto } from '../dto/error.dto';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const message = exception.message;
    console.log(exception);

    response.status(exception.getStatus()).json(
      new ErrorDto({
        status: 'fail',
        message: message,
      }),
    );
  }
}
