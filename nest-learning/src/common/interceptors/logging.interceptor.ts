import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException, ConflictException } from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators"
import { SystemLogsService } from "src/system-logs/system-logs.service";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly systemLogsService: SystemLogsService) { }
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        this.systemLogsService.printOut('Before...')

        const now = Date.now();
        return next
            .handle()
            .pipe(
                tap(() => this.systemLogsService.printOut(`After... ${Date.now() - now}ms`)),
                catchError(err => throwError(err))
            );
    }
}