import { Command } from '@oclif/command';
import * as shelljs from "shelljs";

export default class Up extends Command {
  static description = 'Spins Up your local dev environment'

  static flags = {
  }

  static args = []

  async run() {
    const {args, flags} = this.parse(Up)

    shelljs.exec('docker-compose up -d');
  }
}
