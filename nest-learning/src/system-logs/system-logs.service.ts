import { Injectable } from "@nestjs/common";

@Injectable()
export class SystemLogsService {
  printOut(msg: string) {
    console.log(msg);
  }
}
