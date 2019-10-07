import { Command, flags } from "@oclif/command";
import chalk from "chalk";
import * as shelljs from "shelljs";
import {
  testTargetDirectory,
  displayCommandHeader,
  configureXdebug
} from "../actions";
import Listr from "listr";
import * as ip from "ip";

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
      : shelljs.pwd().toString();

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
