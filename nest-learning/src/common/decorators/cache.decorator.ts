import { SetMetadata } from "@nestjs/common";


export function Cache<T>(cache: T) {
    return SetMetadata('cache', cache)
}