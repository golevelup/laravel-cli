import { Command, flags } from "@oclif/command";

export default class Artisan extends Command {
  static description = "Runs an artisan command (eg make:controller {name})";

  static flags = {
    help: flags.help({ char: "h" }),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({ char: "n", description: "name to print" }),
    // flag with no value (-f, --force)
    force: flags.boolean({ char: "f" })
  };

  static args = [{ name: "command" }];

  async run() {
    const { args, flags } = this.parse(Artisan);
    console.log(args);
    console.log(flags);

    console.log("You called artisan");

    const name = flags.name || "world";
    this.log(
      `hello ${name} from /home/jesse/code/laravel-up/src/commands/artisan.ts`
    );
    if (args.file && flags.force) {
      this.log(`you input --force and --file: ${args.file}`);
    }
  }
}
