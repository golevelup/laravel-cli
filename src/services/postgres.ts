import { DbServiceConfig } from "./service-types";

export const makePostgresService = (config: DbServiceConfig) => ({
  image: "postgres:latest",
  volumes: ["dbdata:/var/lib/postgresql/data"],
  ports: [`${config.port}:5432`],
  environment: [
    "POSTGRES_USER=root",
    `POSTGRES_PASSWORD=${config.password}`,
    `POSTGRES_DB=${config.database}`
  ]
});
