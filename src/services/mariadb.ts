import { DbServiceConfig } from "./service-types";

export const makeMariaDbService = (config: DbServiceConfig) => ({
  image: "mariadb:latest",
  volumes: ["dbdata:/var/lib/mysql"],
  ports: [`${config.port}:3306`],
  environment: [
    `MYSQL_ROOT_PASSWORD=${config.password}`,
    `MYSQL_DATABASE=${config.database}`
  ]
});
