import { Command, flags } from "@oclif/command";
import chalk from "chalk";
import * as cli from "cli-ux";
import * as inquirer from "inquirer";
import * as path from "path";
import * as shelljs from "shelljs";
import {
  promptEnvironment,
  displayCommandHeader,
  publishEnvironment
} from "../actions";

export default class New extends Command {
  static description = "Creates a new Laravel Up project";

  static flags = {
    verbose: flags.boolean({ char: "v", default: false })
  };

  static args = [];

  async run() {
    const { args, flags } = this.parse(New);

    displayCommandHeader(
      "This will guide you through the configuration and scaffolding of a brand new Laravel Up project"
    );

    const pwd = shelljs.pwd().toString();

    const mainPrompt = await inquirer.prompt([
      {
        default: "hello-laravel-up",
        name: "projectName",
        message: "What is your project called?",
        type: "input"
      },
      {
        default: pwd,
        name: "location",
        message: "Where would you like to save your new project?",
        type: "input"
      }
    ]);

    const { projectName, location } = mainPrompt;

    const testTargetDirectory = shelljs.cd(location).stderr;
    if (testTargetDirectory) {
      console.log(
        chalk.red(`${location} is not a valid target project directory`)
      );

      return;
    }

    const dbPrompt = await promptEnvironment();

    cli.ux.action.start("Creating your App!");

    shelljs.exec(
      `docker container run --rm --user $(id -u):$(id -g) -v $(pwd):/app composer create-project --prefer-dist laravel/laravel ${projectName}`,
      { silent: !flags.verbose }
    );

    cli.ux.action.stop();

    await publishEnvironment(path.join(location, projectName), dbPrompt);

    console.log(
      chalk.green("Your project is ready! Just run `lvl up` to start it")
    );
  }
}
