import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from "@nestjs/common";
import { map, timeout } from "rxjs/operators";

export interface Response<T> {
    data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>>{
    intercept(context: ExecutionContext, next: CallHandler) {
        return next.handle().pipe(map(data => ({ data })), timeout(5000))
    }
}