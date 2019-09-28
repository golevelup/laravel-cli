import * as path from "path";
import * as jsyaml from "js-yaml";
import * as shelljs from "shelljs";
import * as envfile from "envfile";
import * as fs from "fs";
import { readFileAsync, writeFileAsync, PromptEnvironmentDef } from ".";

export const publishEnvironment = async (
  location: string,
  dbConfig: PromptEnvironmentDef
) => {
  const baseEnvPath = path.join(__dirname, "../../environment");
  const srcDockerComposePath = path.join(baseEnvPath, "docker-compose.yml");
  const sourceEnvPath = path.join(baseEnvPath, "resources");

  const dockerComposeContents = await readFileAsync(srcDockerComposePath);

  const composeYaml = jsyaml.load(dockerComposeContents.toString());

  // TODO: Need to actually generate different service configs for different DB engines
  const mySqlService = {
    image: "mysql:5.7",
    volumes: ["dbdata:/var/lib/mysql"],
    ports: ["3306:3306"],
    environment: [
      `MYSQL_ROOT_PASSWORD=${dbConfig.dbRootPassword}`,
      `MYSQL_DATABASE=${dbConfig.dbName}`
    ]
  };

  const combined = jsyaml.dump({
    ...composeYaml,
    services: { ...composeYaml.services, database: mySqlService }
  });

  shelljs.cd(location);

  const fullProjectPath = shelljs.pwd().toString();
  const destDockerComposePath = path.join(
    fullProjectPath,
    "docker-compose.yml"
  );

  shelljs.cp("-R", sourceEnvPath, "./environment");
  await writeFileAsync(destDockerComposePath, combined);

  const envPath = path.join(location, ".env");
  const envFileContents = envfile.parseFileSync(envPath);

  const envExamplePath = path.join(location, ".env.example");
  const envExampleFileContents = envfile.parseFileSync(envExamplePath);

  const envOverrides = [
    ["DB_PASSWORD", dbConfig.dbRootPassword],
    ["DB_DATABASE", dbConfig.dbName]
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
