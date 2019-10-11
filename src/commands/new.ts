import { flags } from "@oclif/command";
import chalk from "chalk";
import * as cli from "cli-ux";
import * as inquirer from "inquirer";
import * as path from "path";
import * as shelljs from "shelljs";
import {
  displayCommandHeader,
  promptEnvironment,
  publishEnvironment,
  testTargetDirectory
} from "../actions";
import { VERBOSE_DESCRIPTION } from "./../constants";
import BaseCommand from "./command-base";

export default class New extends BaseCommand {
  static description = "Creates a new Laravel Up project";

  static flags = {
    verbose: flags.boolean({
      char: "v",
      default: true,
      description: VERBOSE_DESCRIPTION
    })
  };

  static args = [];

  async run() {
    const { args, flags } = this.parse(New);

    displayCommandHeader(
      "This will guide you through the configuration and scaffolding of a brand new Laravel Up project"
    );

    const mainPrompt = await inquirer.prompt([
      {
        default: this.currentDirectory,
        name: "directory",
        message: "Where would you like to save your new project?",
        type: "input"
      },
      {
        default: "hello-laravel-up",
        name: "projectName",
        message: "What is your project called?",
        type: "input"
      }
    ]);

    const { projectName, directory } = mainPrompt;

    if (!testTargetDirectory(directory)) {
      return false;
    }

    const dbPrompt = await promptEnvironment();

    console.log();
    cli.ux.action.start("Creating your App!");

    shelljs.exec(
      `docker container run --rm ${
        !this.config.windows ? "--user $(id -u):$(id -g)" : ""
      } -v ${directory}:/app composer create-project --prefer-dist laravel/laravel ${projectName}`,
      { silent: !flags.verbose }
    );

    cli.ux.action.stop();

    await publishEnvironment(path.join(directory, projectName), dbPrompt);

    console.log(
      chalk.green("Your project is ready! Just run `lvl up` to start it")
    );
  }
}
