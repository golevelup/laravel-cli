import { Command, flags } from "@oclif/command";
import * as envfile from "envfile";
import * as inquirer from "inquirer";
import {
  displayCommandHeader,
  promptEnvironment,
  testTargetDirectory,
  publishEnvironment
} from "../actions";
import * as shelljs from "shelljs";
import chalk from "chalk";
import Listr = require("listr");
import { execAsync } from "../providers/execAsync";

export default class Configure extends Command {
  static description =
    "Configures an existing vanilla Laravel app as an Up project";

  static flags = {
    help: flags.help({ char: "h" })
  };

  static args = [];

  async run() {
    const pwd = shelljs.pwd().toString();
    // const pwd = "/home/jesse/code/laravel-tests/vanilla1";

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
          title: "Checking Git status...",
          task: async (ctx, task) => {
            const { stdout } = await execAsync(
              ["git", "status", "--porcelain"].join(" "),
              {
                silent: true
              }
            );
            if (stdout.trim() !== "") {
              throw new Error(
                "Unclean working tree. Commit or stash changes first."
              );
            }
            task.title = "Checked git status";
          }
        },
        {
          title: "Checking Git remote history...",
          task: async (ctx, task) => {
            const { stdout } = await execAsync(
              ["git", "rev-list", "--count", "--left-only", "@{u}...HEAD"].join(
                " "
              ),
              { silent: true }
            );
            if (stdout.trim() !== "0") {
              throw new Error("Remote history differ. Please pull changes.");
            }
            task.title = "Checked remote history";
          }
        }
      ],
      { concurrent: true }
    );

    await gitCheck.run();

    const envConfig = await promptEnvironment();

    await publishEnvironment(location, envConfig);

    console.log(
      chalk.green("Your project is ready! Just run `lvl up` to start it")
    );
  }
}
