import { Arg } from "../types";
import BaseCommand from "./command-base";

export default abstract class TargetDirectoryCommand extends BaseCommand {
  protected targetDirectory!: string;

  static targetArgs = [
    {
      name: "directory",
      description: "The target directory for Laravel Up"
    }
  ];

  static combineArgs = (newArgs: Arg[]) => [
    ...TargetDirectoryCommand.targetArgs,
    ...newArgs
  ];

  async init() {
    await super.init();
    const { args } = this.parse(this.constructor as any);
    this.targetDirectory = args.directory;
  }
}
