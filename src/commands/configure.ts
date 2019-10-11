import { Command, flags } from "@oclif/command";
import chalk from "chalk";
import * as inquirer from "inquirer";
import * as shelljs from "shelljs";
import {
  displayCommandHeader,
  promptEnvironment,
  publishEnvironment,
  testTargetDirectory
} from "../actions";
import { execAsync } from "../providers/execAsync";
import Listr = require("listr");

export default class Configure extends Command {
  static description =
    "Configures an existing vanilla Laravel app as an Up project";

  static flags = {
    help: flags.help({ char: "h" })
  };

  static args = [];

  async run() {
    const pwd = shelljs.pwd().toString();

    displayCommandHeader(
      "This will guide you through configuration of an existing vanilla Laravel application to be used as an Up project"
    );

    const mainPrompt = await inquirer.prompt([
      {
        default: pwd,
        name: "location",
        message:
          "Where is the Laravel app you would like to configure? (Defaults to current directory)",
        type: "input"
      }
    ]);

    const { location } = mainPrompt;

    if (!testTargetDirectory(location)) {
      return;
    }

    const gitCheck = new Listr(
      [
        {
          title: "Checking Git for uncommitted changes...",
          task: async (ctx, task) => {
            const { stdout } = await execAsync(
              ["git", "status", "--porcelain"].join(" "),
              {
                silent: true
              }
            );
            if (stdout.trim() !== "") {
              throw new Error(
                "Commit or stash your working changes first so you can properly review the modifications made by Laravel Up."
              );
            }
          }
        }
      ],
      { concurrent: true }
    );

    try {
      await gitCheck.run();
    } catch (e) {
      return;
    }

    const envConfig = await promptEnvironment();

    await publishEnvironment(location, envConfig);

    console.log(
      chalk.green("Your project is ready! Just run `lvl up` to start it")
    );
  }
}
