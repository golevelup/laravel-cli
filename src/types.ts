export interface Arg {
  name: string;
  description: string;
  required?: boolean;
}

export type DatabaseEngine = "mysql" | "postgres";

export interface DatabaseConfig {
  engine: DatabaseEngine;
  name: string;
  password: string;
  port: number;
}

export interface AppConfig {
  port: number;
}

export interface UpEnvironmentConfig {
  app: AppConfig;
  database: DatabaseConfig;
}
