import { flags } from "@oclif/command";
import execa from "execa";
import BaseCommand from "./command-base";

export default class Artisan extends BaseCommand {
  static description = "Runs an artisan command in the current directory";

  static strict = false;

  static flags = {
    ["command-help"]: flags.boolean({
      char: "h",
      description: "Passes --help to the underlying artisan command"
    })
  };

  static args = [
    {
      name: "command",
      description:
        "The command to pass to artisan. Omit this to see available commands",
      required: false
    }
  ];

  async run() {
    const { argv, flags } = this.parse(Artisan);

    try {
      console.log();
      const artisanArgs = ["app", "php", "artisan", ...argv];
      if (flags["command-help"]) {
        artisanArgs.push("--help");
      }
      await execa("docker-compose exec", artisanArgs, {
        shell: true,
        stdio: "inherit"
      });
    } catch (e) {
      return;
    }
  }
}
