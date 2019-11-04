import { flags } from "@oclif/command";
import chalk from "chalk";
import * as inquirer from "inquirer";
import Listr from "listr";
import {
  displayCommandHeader,
  promptEnvironment,
  publishEnvironment,
  tryChangeDirectory
} from "../actions";
import { execAsync } from "../providers/execAsync";
import TargetDirectoryCommand from "./target-directory-command";

export default class Configure extends TargetDirectoryCommand {
  static description =
    "Configures an existing vanilla Laravel app as an Up project";

  static flags = {
    help: flags.help({ char: "h" })
  };

  static args = TargetDirectoryCommand.combineArgs([]);

  async run() {
    const { args } = this.parse(Configure);

    displayCommandHeader(
      "This will guide you through configuration of an existing vanilla Laravel application to be used as an Up project"
    );

    let directory = args.directory;

    if (!directory) {
      const mainPrompt = await inquirer.prompt([
        {
          default: this.currentDirectory,
          name: "directory",
          message:
            "Where is the Laravel app you would like to configure? (Defaults to current directory)",
          type: "input"
        }
      ]);

      directory = mainPrompt.directory;
    }

    if (!tryChangeDirectory(directory)) {
      return;
    }

    const gitCheck = new Listr(
      [
        {
          title: "Checking Git for uncommitted changes...",
          skip: async () => {
            try {
              const { stdout } = await execAsync(
                "git rev-parse --is-inside-work-tree",
                {
                  silent: true
                }
              );
              return false;
            } catch (e) {
              // TODO: Listr types for skip() aren't quite right so this needs to be cast
              return "Directory is not a Git repository" as any;
            }
          },
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

    await publishEnvironment(directory, envConfig);

    console.log(
      chalk.green("Your project is ready! Just run `lvl up` to start it")
    );
  }
}
