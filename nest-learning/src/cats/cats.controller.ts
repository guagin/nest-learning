import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  HttpException,
  HttpStatus,
  UseFilters,
  UsePipes,
  // ParseIntPipe,
  Param,
  UseGuards,
  SetMetadata,
  // ValidationPipe,

} from "@nestjs/common";
import { Cat } from "./interfaces/cat.interface";
import { CatsService } from "./cats.service";
import { TestException } from "src/common/exceptions/not-implement.exception";
import { CreateCatDto } from "./dto/create-cat.dto";
import { ValidationPipe } from "src/common/pipes/validation.pipe";
import { ParseIntPipe } from "src/common/pipes/parse-int.pipe";
import { AuthGuard } from "src/common/guard/auth.guard";
import { Roles } from "src/common/guard/role.decorator";

@Controller("cats")
@UseGuards(AuthGuard)
@Roles('admin')
export class CatsController {
  constructor(private readonly catService: CatsService) { }

  @Post()
  @UsePipes(ValidationPipe) // TODO: need create catSchema
  create(@Body() createCatDto: CreateCatDto): string {
    //TODO: validate body?
    console.log(`createCatDto: ${JSON.stringify(createCatDto)}`)
    return "this will create cat";
  }

  @Get('all')
  async get(): Promise<Cat[]> {
    return this.catService.getAll();
  }

  @Get("/triggerError")
  async triggerError(@Query("msg") msg: string): Promise<void> {
    throw new HttpException(`${msg}`, HttpStatus.NOT_IMPLEMENTED);
  }

  @Get("/triggerError2")
  async triggerError2(@Query("msg") msg: string): Promise<void> {
    throw new TestException();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(`id: ${id}`)
    return 'shit'
  }
}
