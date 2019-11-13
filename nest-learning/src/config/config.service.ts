import { Injectable, Inject } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
import { EnvConfig } from "./interfaces/envconfig.interface";
import { CONFIG_OPTIONS } from "./provider.token";

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(@Inject(CONFIG_OPTIONS) private readonly options) {
    const filePath = `${process.env.NODE_ENV || "development"}.env`;
    const envFile = path.resolve(
      __dirname,
      "../../",
      this.options.folder,
      filePath
    );
    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
  }

  getConfig() {
    return this.envConfig;
  }
}
