import Command from "@oclif/command";
import * as shelljs from "shelljs";

export default abstract class BaseCommand extends Command {
  protected currentDirectory!: string;

  async init() {
    await super.init();
    this.currentDirectory = shelljs.pwd().toString();
  }
}
