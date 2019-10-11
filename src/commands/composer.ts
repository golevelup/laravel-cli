import { flags } from "@oclif/command";
import * as shelljs from "shelljs";
import BaseCommand from "./command-base";

export default class Composer extends BaseCommand {
  static description = "Executes a Composer command in the current directory";

  static strict = false;

  static flags = {
    ["command-help"]: flags.boolean({
      char: "h",
      description: "Passes --help to the underlying composer command"
    })
  };

  static args = [
    {
      name: "command",
      description:
        "The command to pass to composer. Omit this to see available commands",
      required: false
    }
  ];

  async run() {
    const { argv, flags } = this.parse(Composer);

    const combined = argv.join(" ");

    let commandText = `docker container run --rm ${
      !this.config.windows ? "--user $(id -u):$(id -g)" : ""
    } -v ${this.currentDirectory}:/app composer ${combined}`;

    console.log(commandText);

    if (flags["command-help"]) {
      commandText = commandText = `${commandText} --help`;
    }

    shelljs.exec(commandText);
  }
}
