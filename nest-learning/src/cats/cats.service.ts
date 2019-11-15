import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';

type CatDocument = Cat & Document

@Injectable()
export class CatsService {

  constructor(@InjectModel('Cat') private readonly catModel: Model<CatDocument>) { }

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto)
    return createdCat;
  }

  async getAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }
}
