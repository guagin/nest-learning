import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
    transform(value: string, metadata: ArgumentMetadata): number {
        console.log(`value: ${value}`)
        const val = parseInt(value, 10);
        if (isNaN(val)) {
            throw new BadRequestException('validation failed')
        }
        return val
    }
}