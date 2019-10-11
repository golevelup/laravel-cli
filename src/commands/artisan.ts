import { flags } from "@oclif/command";
import * as shelljs from "shelljs";
import BaseCommand from "./command-base";

export default class Artisan extends BaseCommand {
  static description = "Runs an artisan command (eg make:controller {name})";

  static strict = false;

  static flags = {
    ["command-help"]: flags.boolean({
      char: "h",
      description: "Passes --help to the underlying composer command"
    }),
    silent: flags.boolean({
      char: "s",
      description: "Silent mode prevents artisan shell output",
      default: false
    })
  };

  static args = [
    {
      name: "command",
      description: "The command to pass to artisan",
      required: false
    }
  ];

  async run() {
    const { argv, flags } = this.parse(Artisan);

    shelljs.cd("~/code/givelify/portal-api");

    const combined = argv.join(" ");

    let commandText = `docker-compose exec -T app php artisan ${combined}`;
    if (flags["command-help"]) {
      commandText = commandText = `${commandText} --help`;
    }

    shelljs.exec(commandText, {
      silent: flags.silent && !flags["command-help"]
    });
  }
}
