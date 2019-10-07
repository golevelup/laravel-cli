import { string } from "@oclif/parser/lib/flags";

export interface DbServiceConfig {
  port: number;
  database: string;
  password: string;
}
