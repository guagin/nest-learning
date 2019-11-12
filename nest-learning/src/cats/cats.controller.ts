import { Controller, Post, Get, Body } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() body: Body): string {
    return 'this will create cat';
  }

  @Get()
  get(): string {
    return 'this will return all cat';
  }
}
