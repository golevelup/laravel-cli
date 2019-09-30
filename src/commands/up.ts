import { Command, flags } from "@oclif/command";
import chalk from "chalk";
import * as shelljs from "shelljs";
import { testTargetDirectory, displayCommandHeader } from "../actions";

export default class Up extends Command {
  static description = "Spins Up your local dev environment";

  static flags = {
    verbose: flags.boolean({ char: "v", default: false })
  };

  static args = [
    {
      name: "directory",
      description: "The Laravel Up directory you would like to launch"
    }
  ];

  async run() {
    const { args, flags } = this.parse(Up);

    displayCommandHeader("Preparing to launch your project...");

    const directory = args.directory
      ? args.directory
      : "/home/jesse/code/a-test-laravel";
    //const directory = args.directory ? args.directory : shelljs.pwd().toString();

    if (!testTargetDirectory(directory)) {
      return false;
    }

    shelljs.cd(directory);
    shelljs.exec("docker-compose up -d", { silent: !flags.verbose });

    console.log(
      chalk.green("Your app is now available at http://localhost:8080")
    );
  }
}
