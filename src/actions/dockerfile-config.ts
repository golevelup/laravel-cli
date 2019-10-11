import { replaceFileContent } from "./utility";
import { join } from "path";
import { DB_DRIVER_REPLACE_STRING } from "../constants";

export const pSqlDriverInstall = async (projectPath: string) => {
  const srcAppDockerFile = join(
    projectPath,
    "environment/dockerfiles/app.dockerfile"
  );
  const replaceArgs = [
    DB_DRIVER_REPLACE_STRING,
    [
      "RUN apt-get update && apt-get install -y libpq-dev \\",
      "    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \\",
      "    && docker-php-ext-install pdo pdo_pgsql pgsql"
    ].join("\n")
  ];
  await replaceFileContent(srcAppDockerFile, replaceArgs);
};

export const mysqlDriverInstall = async (projectPath: string) => {
  const srcAppDockerFile = join(
    projectPath,
    "environment/dockerfiles/app.dockerfile"
  );
  const replaceArgs = [
    DB_DRIVER_REPLACE_STRING,
    "RUN docker-php-ext-install pdo_mysql"
  ];
  await replaceFileContent(srcAppDockerFile, replaceArgs);
};
