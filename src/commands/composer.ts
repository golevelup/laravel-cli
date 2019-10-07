import { Command, flags } from "@oclif/command";
import * as shelljs from "shelljs";

export default class Composer extends Command {
  static description = "Executes a composer command";

  static strict = false;

  static flags = {
    ["command-help"]: flags.boolean({
      char: "h",
      description: "Passes --help to the underlying composer command"
    }),
    silent: flags.boolean({
      char: "s",
      description: "Silent mode prevents Composer shell output",
      default: false
    })
  };

  static args = [
    {
      name: "command",
      description:
        "The command to pass to composer. Should be wrapped in quotes if passing flags",
      required: true
    }
  ];

  async run() {
    const { argv, flags } = this.parse(Composer);

    const combined = argv.join(" ");

    let commandText = `docker container run --rm --user $(id -u):$(id -g) -v $(pwd):/app composer ${combined}`;
    if (flags["command-help"]) {
      commandText = commandText = `${commandText} --help`;
    }

    shelljs.exec(commandText, {
      silent: flags.silent && !flags["command-help"]
    });
  }
}
