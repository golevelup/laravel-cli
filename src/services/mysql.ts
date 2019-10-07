import { DbServiceConfig } from "./service-types";

export const makeMySqlService = (config: DbServiceConfig) => ({
  image: "mysql:5.7",
  volumes: ["dbdata:/var/lib/mysql"],
  ports: [`${config.port}:3306`],
  environment: [
    `MYSQL_ROOT_PASSWORD=${config.password}`,
    `MYSQL_DATABASE=${config.database}`
  ]
});
