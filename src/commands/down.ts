import { flags } from "@oclif/command";
import chalk from "chalk";
import * as inquirer from "inquirer";
import * as shelljs from "shelljs";
import { displayCommandHeader, tryChangeDirectory } from "../actions";
import { VERBOSE_DESCRIPTION } from "../constants";
import TargetDirectoryCommand from "./target-directory-command";

export default class Down extends TargetDirectoryCommand {
  static description = "Stops a running Laravel Up environment";

  static flags = {
    verbose: flags.boolean({
      char: "v",
      default: false,
      description: VERBOSE_DESCRIPTION
    }),
    destroy: flags.boolean({
      char: "d",
      default: false,
      description: "Stops Docker containers and removes all volumes"
    })
  };

  static args = TargetDirectoryCommand.combineArgs([]);

  async run() {
    const { args, flags } = this.parse(Down);

    displayCommandHeader("Shutting down your Laravel Up environment...");

    const directory = this.targetDirectory
      ? this.targetDirectory
      : this.currentDirectory;

    if (!tryChangeDirectory(directory)) {
      return false;
    }

    if (flags.destroy) {
      const confirmPrompt = (await inquirer.prompt([
        {
          message: chalk.yellow(
            "Are you sure you would like to clear your local Database(s)?"
          ),
          name: "confirm",
          type: "confirm"
        }
      ])).confirm;

      if (!confirmPrompt) {
        return;
      }
    }

    shelljs.cd(directory);
    shelljs.exec(
      ["docker-compose", "down", flags.destroy ? "-v" : ""].join(" "),
      { silent: !flags.verbose }
    );

    console.log(chalk.gray("Your Laravel Up environment has been stopped"));
  }
}
