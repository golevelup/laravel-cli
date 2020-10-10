import * as envfile from "envfile";
import * as fs from "fs-extra";
import * as jsyaml from "js-yaml";
import * as path from "path";
import * as shelljs from "shelljs";
import { PromptEnvironmentDef, readFileAsync, writeFileAsync } from ".";
import { MARIA, MYSQL, POSTGRES } from "../constants";
import {
  DbServiceConfig,
  makeMySqlService,
  makePostgresService
} from "../services";
import { mysqlDriverInstall, pSqlDriverInstall } from "./dockerfile-config";
import { UpEnvironmentConfig } from "../types";
import { makeRedisService } from "../services/redis";
import { makeMariaDbService } from "../services/mariadb";

export const publishEnvironment = async (
  location: string,
  envConfig: PromptEnvironmentDef
) => {
  const baseEnvPath = path.join(__dirname, "../../environment");
  const srcDockerComposePath = path.join(baseEnvPath, "docker-compose.yml");
  const sourceEnvPath = path.join(baseEnvPath, "resources");

  const dockerComposeContents = await readFileAsync(srcDockerComposePath);
  shelljs.cd(location);

  const fullProjectPath = shelljs.pwd().toString();

  const destDockerComposePath = path.join(
    fullProjectPath,
    "docker-compose.yml"
  );

  await fs.copy(sourceEnvPath, path.join(fullProjectPath, "environment"), {
    overwrite: true,
    recursive: true
  });

  let composeYaml = jsyaml.load(dockerComposeContents.toString());

  let dbService;
  const dbConfig: DbServiceConfig = {
    database: envConfig.dbName,
    password: envConfig.dbRootPassword,
    port: envConfig.dbHostPort
  };

  switch (envConfig.engine) {
    case POSTGRES:
      dbService = makePostgresService(dbConfig);
      await pSqlDriverInstall(location);
      break;
    case MARIA:
      dbService = makeMariaDbService(dbConfig);
      await mysqlDriverInstall(location);
      break;
    case MYSQL:
    default:
      dbService = makeMySqlService(dbConfig);
      await mysqlDriverInstall(location);
  }

  if (envConfig.webPort != 8080) {
    composeYaml["services"]["web"]["ports"][0] = `${envConfig.webPort}:80`;
  }

  composeYaml = {
    ...composeYaml,
    services: { ...composeYaml.services, database: dbService }
  };

  if (envConfig.redis) {
    composeYaml.services.redis = makeRedisService({
      port: envConfig.redisPort
    });
  }

  await writeFileAsync(destDockerComposePath, jsyaml.dump(composeYaml));

  const envExamplePath = path.join(fullProjectPath, ".env.example");
  const envExampleFileContents = envfile.parseFileSync(envExamplePath);

  const envPath = path.join(fullProjectPath, ".env");
  if (!fs.existsSync(envPath)) {
    shelljs.cp(envExamplePath, envPath);
  }
  const envFileContents = envfile.parseFileSync(envPath);

  const envOverrides = [
    ["DB_HOST", "database"],
    ["DB_USERNAME", "root"],
    ["DB_PASSWORD", envConfig.dbRootPassword],
    ["DB_DATABASE", envConfig.dbName],
    ["DB_CONNECTION", envConfig.engine === POSTGRES ? "pgsql" : "mysql"],
    ["DB_PORT", envConfig.engine === POSTGRES ? 5432 : 3306]
  ];

  envOverrides.forEach(([key, value]) => {
    envFileContents[key] = value;
    envExampleFileContents[key] = value;
  });

  fs.writeFileSync(envPath, envfile.stringifySync(envFileContents));
  fs.writeFileSync(
    envExamplePath,
    envfile.stringifySync(envExampleFileContents)
  );

  const environmentConfig: UpEnvironmentConfig = {
    app: {
      port: envConfig.webPort
    },
    database: {
      engine: envConfig.engine,
      name: envConfig.dbName,
      password: envConfig.dbRootPassword,
      port: envConfig.dbHostPort
    }
  };

  await writeFileAsync(
    path.join(fullProjectPath, "laravel-up.yml"),
    jsyaml.dump(environmentConfig)
  );
};
