import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod
} from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CatsModule } from "./cats/cats.module";
import { ConfigModule } from "./config/config.module";
import { LoggerMiddleware } from "./common/middleware/logger.middleware";
import { CatsController } from "./cats/cats.controller";
import { HttpExceptionFilter } from "./common/exceptions/http.exception";
import { SystemLogsModule } from "./system-logs/system-logs.module";
import { APP_FILTER } from "@nestjs/core";

@Module({
  imports: [
    CatsModule,
    SystemLogsModule,
    ConfigModule.register({ folder: "./config" })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(CatsController);
  }
}
