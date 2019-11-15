import {
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
  Catch,
  HttpStatus,
  Inject
} from "@nestjs/common";

import { SystemLogsService } from "src/system-logs/system-logs.service";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  constructor(private readonly systemLogsService: SystemLogsService) { }
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getResponse();
    console.log(`HttpExceptionFilter ${JSON.stringify(exception)}`)
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    console.log(`${JSON.stringify(exception.message)}`);
    response.status(status).json({
      statusCode: status,
      timeStamp: new Date().toISOString(),
      path: request.rul
    });
  }
}
