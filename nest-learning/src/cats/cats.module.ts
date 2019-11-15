import { Module } from "@nestjs/common";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";
import { MongooseModule } from "@nestjs/mongoose";
import { CatsSchema } from "./schemas/cats.schemas";

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Cat', schema: CatsSchema }])],
  controllers: [CatsController],
  providers: [CatsService]
})
export class CatsModule { }
