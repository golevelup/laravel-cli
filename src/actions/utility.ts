import chalk from "chalk";
import * as fs from "fs";
import * as shelljs from "shelljs";
import * as os from "os";
import { promisify } from "util";

export const readFileAsync = promisify(fs.readFile);
export const writeFileAsync = promisify(fs.writeFile);

export const shellWhitespace = console.log;

export const tryChangeDirectory = (candidateDir: string, printError = true) => {
  const verifyPath = shelljs.exec(`cd ${candidateDir}`, { silent: true });
  if (verifyPath.stderr) {
    if (printError) {
      console.log(
        chalk.red(`\n${candidateDir} is not a valid project directory`)
      );
    }
    return false;
  }

  shelljs.cd(candidateDir);

  return true;
};

export const replaceFileContent = async (
  filePath: string,
  replaceArgs: string[]
) => {
  const fileContent = await readFileAsync(filePath);
  const newContent = fileContent
    .toString()
    .replace(replaceArgs[0], replaceArgs[1]);
  await writeFileAsync(filePath, newContent);
};

/**
 * From https://stackoverflow.com/a/57243075/717643
 */
export const resolvePath = (filePath: string) => {
  // '~/folder/path' or '~'
  if (filePath[0] === "~" && (filePath[1] === "/" || filePath.length === 1)) {
    return filePath.replace("~", os.homedir());
  }
  return filePath;
};
