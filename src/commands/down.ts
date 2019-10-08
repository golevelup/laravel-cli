import { Command, flags } from "@oclif/command";

import chalk from "chalk";
import * as shelljs from "shelljs";
import { testTargetDirectory, displayCommandHeader } from "../actions";

export default class Down extends Command {
  static description = "Stops a running Laravel Up project";

  static flags = {
    verbose: flags.boolean({ char: "v", default: false })
  };

  static args = [
    {
      name: "directory",
      description: "Running Laravel Up directory you would like to stop"
    }
  ];

  async run() {
    const { args, flags } = this.parse(Down);

    displayCommandHeader("Shutting down your project...");

    const directory = args.directory
      ? args.directory
      : shelljs.pwd().toString();

    if (!testTargetDirectory(directory)) {
      return false;
    }

    shelljs.cd(directory);
    shelljs.exec("docker-compose down", { silent: !flags.verbose });

    console.log(chalk.green("\nYour app is stopped"));
  }
}
