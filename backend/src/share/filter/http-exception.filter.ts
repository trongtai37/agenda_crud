import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { Response } from 'express';
import { get } from 'lodash';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private getStatus = (exception: HttpException | AxiosError) => {
    return exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
  };

  private getCode = (exception: HttpException | AxiosError) => {
    return exception instanceof HttpException && exception.getResponse()['code']
      ? exception.getResponse()['code']
      : 'ERROR_CODE.COMMON_SYSTEM_ERROR';
  };

  private getMessage = (exception: HttpException | AxiosError): string => {
    const status = this.getStatus(exception);

    if (status === HttpStatus.UNPROCESSABLE_ENTITY) {
      const errors = this.getErrors(exception);
      return Object.values(get(errors, '[0].constraints')).shift() as string;
    }

    return exception?.message || 'ERROR_MESSAGE.ERROR_MESSAGE_DEFAULT_SYSTEM';
  };

  private getErrors = (exception: HttpException | AxiosError) => {
    return exception instanceof HttpException
      ? exception.getResponse()['errors']
      : Object.assign(
          { data: (exception as any)?.response?.data },
          (exception as any)?.toJSON?.(),
        );
  };

  catch(exception: HttpException | AxiosError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    // const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status = this.getStatus(exception);
    const message = this.getMessage(exception);
    const errors = this.getErrors(exception);
    const code = this.getCode(exception);

    if (status == HttpStatus.INTERNAL_SERVER_ERROR) {
      // this.logger.customError(message, exception.stack, thisLog);
    }

    if (exception instanceof HttpException) {
      // this.logger.log(JSON.stringify(exception.getResponse()));
    }

    response.status(status).json({
      message,
      code,
      errors,
      statusCode: status,
    });
  }
}
