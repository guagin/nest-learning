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
  UseInterceptors,
  // ValidationPipe,

} from "@nestjs/common";
import { Cat } from "./interfaces/cat.interface";
import { CatsService } from "./cats.service";
import { TestException } from "src/common/exceptions/not-implement.exception";
import { CreateCatDto } from "./dto/create-cat.dto";
import { ValidationPipe } from "src/common/pipes/validation.pipe";
import { ParseIntPipe } from "src/common/pipes/parse-int.pipe";
import { AuthGuard } from "src/common/guard/auth.guard";
// import { Roles } from "src/common/decorators/role.decorator";
import { LoggingInterceptor } from "src/common/interceptors/logging.interceptor";
import { SystemLogsService } from "src/system-logs/system-logs.service";
import { ExcludeNullInterceptor } from "src/common/interceptors/execlude-null.interceptor";
import { Cache } from "src/common/decorators/cache.decorator";

@Controller("cats")
@UseGuards(AuthGuard)
// @Roles('admin')
@UseInterceptors(LoggingInterceptor, ExcludeNullInterceptor)
export class CatsController {
  constructor(private readonly catService: CatsService,
    private readonly systemLogsService: SystemLogsService) { }

  @Post('create')
  @UsePipes(ValidationPipe) // TODO: need create catSchema
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catService.create(createCatDto)
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
    this.systemLogsService.printOut(`id: ${id}`)
    return {
      msg: 'shit',
      msg2: null
    }
  }
}
