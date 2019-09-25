import { Command, flags } from '@oclif/command';
import chalk from 'chalk';
import * as cli from 'cli-ux';
import * as figlet from 'figlet';
import * as fs from 'fs';
import * as inquirer from 'inquirer';
import * as jsyaml from 'js-yaml';
import * as path from 'path';
import * as shelljs from 'shelljs';

const MYSQL = "MySQL";
const MARIA = "MariaDb";
const POSTGRES = "Postgres"

const { promisify } = require("util");

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

export default class New extends Command {
  static description = 'Creates a new Laravel Up project'

  static flags = {
    verbose: flags.boolean({char: 'v', default: false})
  }

  static args = []

  async run() {
    const {args, flags} = this.parse(New)

    console.log(
      chalk.blue(figlet.textSync("laravel-up", { horizontalLayout: "full" }))
    );

    console.log();
    console.log(chalk.black.bgCyan('This will guide you through the creation of a brand new Laravel Up project'));
    console.log();

    const pwd = shelljs.pwd().toString();
    
    const mainPrompt = await inquirer.prompt([
      {
        default: 'hello-laravel-up',
        name: "projectName",
        message: "What is your project called?",
        type: "input"
      },
      {
        default: pwd,
        name: "location",
        message: "Where would you like to save your new project?",
        type: "input"
      },
    ]);

    const { projectName, location } = mainPrompt;

    const testTargetDirectory = shelljs.cd(location).stderr;
    if (testTargetDirectory) {
      console.log(
        chalk.red(
          `${location} is not a valid target project directory`
        )
      );

      return;
    }

    const dbPrompt = await inquirer.prompt([
      {
        name: "database",
        message: "What Database engine would you like to use?",
        type: "list",
        choices: [
          {
            name: MYSQL
          },
          {
            name: MARIA
          },
          {
            name: POSTGRES
          }
        ]
      },
      {
        name: "dbRootPassword",
        message: "What is the Database Root password (for local development)?",
        default: "secret",
        type: "input"
      },
      {
        name: "dbName",
        message: "What is the database name?",
        default: "homestead",
        type: "input"
      }
    ]);

    cli.ux.action.start('Creating your App!')

    shelljs.exec(
      `docker container run --rm --user $(id -u):$(id -g) -v $(pwd):/app composer create-project --prefer-dist laravel/laravel ${projectName}`, { silent: !flags.verbose }
    );

    cli.ux.action.stop();


    const baseEnvPath = path.join(__dirname, "../../environment");
    const srcDockerComposePath = path.join(baseEnvPath, 'docker-compose.yml');
    const sourceEnvPath = path.join(baseEnvPath, "resources");

    const dockerComposeContents = await readFileAsync(srcDockerComposePath);

    const composeYaml = jsyaml.load(dockerComposeContents);

    const mySqlService = {
      image: "mysql:5.7",
      volumes: ["dbdata:/var/lib/mysql"],
      ports: ["3306:3306"],
      environment: [
        `MYSQL_ROOT_PASSWORD=${dbPrompt.dbRootPassword}`,
        `MYSQL_DATABASE=${dbPrompt.dbName}`,
      ]
    };

    const combined = jsyaml.dump({ ...composeYaml, services: { ...composeYaml.services, database: mySqlService } });

    shelljs.cd(projectName);

    const fullProjectPath = shelljs.pwd().toString();
    const destDockerComposePath = path.join(
      fullProjectPath,
      "docker-compose.yml"
    );
    
    shelljs.cp("-R", sourceEnvPath, "./environment");
    await writeFileAsync(destDockerComposePath, combined);
  }
}
