import { Command } from "@oclif/command";
import * as shelljs from "shelljs";
import { testTargetDirectory, displayCommandHeader } from "../actions";
import cli from "cli-ux";

export default class Up extends Command {
  static description = "Spins Up your local dev environment";

  static flags = {};

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
      : "/home/jesse/code/a-test-laravel";
    //const directory = args.directory ? args.directory : shelljs.pwd().toString();

    if (!testTargetDirectory(directory)) {
      return false;
    }

    shelljs.cd(directory);
    // shelljs.exec("docker-compose up -d");

    // cli.url('www.google.com', 'www.google.com');
  }
}
