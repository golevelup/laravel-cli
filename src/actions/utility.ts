import { promisify } from "util";
import * as fs from "fs";
import * as shelljs from "shelljs";
import chalk from "chalk";

export const readFileAsync = promisify(fs.readFile);
export const writeFileAsync = promisify(fs.writeFile);

export const testTargetDirectory = (candidateDir: string) => {
  const hasDirError = shelljs.cd(candidateDir).stderr;

  if (hasDirError) {
    console.log(
      chalk.red(`${location} is not a valid target project directory`)
    );

    return false;
  }

  return true;
};
