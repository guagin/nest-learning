import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/cat.dto';

@Injectable()
export class CatsService {
  private cats: Cat[];

  constructor() {
    this.cats = [];
  }

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    this.cats.push(createCatDto);
    return createCatDto;
  }

  async getAll(): Promise<Cat[]> {
    return this.cats;
  }
}
