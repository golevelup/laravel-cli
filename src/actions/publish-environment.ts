import * as path from "path";
import * as jsyaml from "js-yaml";
import * as shelljs from "shelljs";
import * as envfile from "envfile";
import * as fs from "fs";
import { readFileAsync, writeFileAsync, PromptEnvironmentDef } from ".";
import { POSTGRES } from "../constants";
import {
  makeMySqlService,
  DbServiceConfig,
  makePostgresService
} from "../services";

export const publishEnvironment = async (
  location: string,
  envConfig: PromptEnvironmentDef
) => {
  const baseEnvPath = path.join(__dirname, "../../environment");
  const srcDockerComposePath = path.join(baseEnvPath, "docker-compose.yml");
  const sourceEnvPath = path.join(baseEnvPath, "resources");

  const dockerComposeContents = await readFileAsync(srcDockerComposePath);

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
      break;
    default:
      dbService = makeMySqlService(dbConfig);
      break;
  }

  if (envConfig.webPort != 8080) {
    composeYaml["services"]["web"]["ports"][0] = `${envConfig.webPort}:80`;
  }

  composeYaml = {
    ...composeYaml,
    services: { ...composeYaml.services, database: dbService }
  };

  shelljs.cd(location);

  const fullProjectPath = shelljs.pwd().toString();
  const destDockerComposePath = path.join(
    fullProjectPath,
    "docker-compose.yml"
  );

  shelljs.cp("-R", sourceEnvPath, "./environment");
  await writeFileAsync(destDockerComposePath, jsyaml.dump(composeYaml));

  const envExamplePath = path.join(location, ".env.example");
  const envExampleFileContents = envfile.parseFileSync(envExamplePath);

  const envPath = path.join(location, ".env");
  if (!fs.existsSync(envPath)) {
    shelljs.cp(envExamplePath, envPath);
  }
  const envFileContents = envfile.parseFileSync(envPath);

  const envOverrides = [
    ["DB_HOST", "database"],
    ["DB_USERNAME", "root"],
    ["DB_PASSWORD", envConfig.dbRootPassword],
    ["DB_DATABASE", envConfig.dbName]
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
};
