import { Module, Global, OnApplicationShutdown, OnModuleInit } from "@nestjs/common";
import { SystemLogsService } from "./system-logs.service";

@Global()
@Module({
  providers: [SystemLogsService],
  exports: [SystemLogsService]
})
export class SystemLogsModule implements OnApplicationShutdown, OnModuleInit {

  onModuleInit() {
    //do some initalization.
    console.log('The module has been initialized.');
  }
  onApplicationShutdown(signal: string) {
    console.log(signal); // e.g. "SIGINT"
  }
}
