import chalk from "chalk";
import * as cli from "cli-ux";
import * as figlet from "figlet";

export const displayCommandHeader = (header: string) => {
  console.log();

  console.log(
    chalk.cyan(
      figlet.textSync("Laravel Up!", {
        horizontalLayout: "default",
        font: "Cybermedium"
      })
    )
  );

  console.log();
  console.log(chalk.green(header));
  console.log();
};
