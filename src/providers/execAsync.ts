import * as shelljs from "shelljs";

/**
 * Async version of shelljs.exec to resolve callback function output
 * @param command Command String
 * @param options Shelljs Execution Option
 */
export const execAsync = (command: string, options: shelljs.ExecOptions = {}) =>
  new Promise<{ stdout: string; stderr: string }>((resolve, reject) => {
    shelljs.exec(command, options, (code, stdout, stderr) => {
      if (code != 0) return reject(new Error(stderr));
      return resolve({ stdout, stderr });
    });
  });
