import { Controller, Post, Get, Body } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catService: CatsService) {}

  @Post()
  create(@Body() body: Body): string {
    //TODO: validate body?
    return 'this will create cat';
  }

  @Get()
  async get(): Promise<Cat[]> {
    return this.catService.getAll();
  }
}
