import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import { ConfigService } from "src/config/config.service";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) { }
  use(req: Request, res: Response, next: Function) {
    console.log(`Request come in: `);
    console.log(` path: ${JSON.stringify(req.path)}`);
    console.log(` query: ${JSON.stringify(req.query)}`);
    console.log(` params: ${JSON.stringify(req.params)}`);
    next();
  }
}
