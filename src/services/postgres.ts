import { DbServiceConfig } from "./service-types";

export const makePostgresService = (config: DbServiceConfig) => ({
  image: "postgres:latest",
  // volumes: ["dbdata:/var/lib/mysql"],
  ports: [`${config.port}:3306`],
  environment: [
    "POSTGRES_USER=root",
    `POSTGRES_PASSWORD=${config.password}`,
    `POSTGRES_DB=${config.database}`
  ]
});
