import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException
} from "@nestjs/common";
import { ObjectSchema } from "@hapi/joi";
import { plainToClass } from 'class-transformer'
import { validate } from "class-validator";
import { CatsService } from "src/cats/cats.service";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  constructor(private readonly catsService: CatsService) { }
  async transform(value: any, { metatype }: ArgumentMetadata) {
    console.log(`metatype: ${metatype}`)
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }

    const object = plainToClass(metatype, value)
    console.log(JSON.stringify(object))
    const errors = await validate(object)
    if (errors.length > 0) {
      throw new BadRequestException('validation failed')
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype)
  }
}

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: ObjectSchema) { }

  transform(value: any, metaSchema: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException("validate failed");
    }
    return value;
  }
}

