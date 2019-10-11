import { flags } from "@oclif/command";
import chalk from "chalk";
import * as ip from "ip";
import Listr from "listr";
import * as shelljs from "shelljs";
import {
  configureXdebug,
  displayCommandHeader,
  testTargetDirectory
} from "../actions";
import { VERBOSE_DESCRIPTION } from "../constants";
import TargetDirectoryCommand from "./target-directory-command";

export default class Up extends TargetDirectoryCommand {
  static description = "Starts a Laravel Up environment";

  static flags = {
    verbose: flags.boolean({
      char: "v",
      default: false,
      description: VERBOSE_DESCRIPTION
    })
  };

  static args = TargetDirectoryCommand.combineArgs([]);

  async run() {
    const { args, flags } = this.parse(Up);

    displayCommandHeader("Preparing to launch your project...");

    const directory = this.targetDirectory
      ? this.targetDirectory
      : this.currentDirectory;

    if (!testTargetDirectory(directory)) {
      return false;
    }

    shelljs.cd(directory);

    const xdebugIp = ip.address();

    const tasks = new Listr([
      // {
      //   title: "Checking Composer install",
      //   task: noop,
      //   skip: () => "Packages are already installed"
      // },
      {
        title: `Setting XDebug Remote Host to ${xdebugIp}`,
        task: () => configureXdebug(directory, xdebugIp)
      },
      {
        title: "Starting Docker Services",
        task: async () => {
          const output = await shelljs
            .exec("docker-compose up -d", { silent: !flags.verbose })
            .stderr.toString();

          if (output.includes("ERROR")) {
            throw new Error("Failed to start Docker Services");
          }
        }
      }
      // {
      //   title: "Verifying App Key",
      //   task: noop,
      //   skip: () => "Key has already been set"
      // }
    ]);

    try {
      await tasks.run();
    } catch (e) {
      let errorMessage = "Error starting application";
      errorMessage = !flags.verbose
        ? `${errorMessage}. Consider using -v or --verbose to diagnose`
        : errorMessage;
      console.log(chalk.red(`\n${errorMessage}`));
      return;
    }

    console.log(
      chalk.green("\nYour app is now available at http://localhost:8080")
    );
  }
}
