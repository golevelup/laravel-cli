import * as fs from "fs";
import * as jsyaml from "js-yaml";
import * as path from "path";
import * as shelljs from "shelljs";
import { UpEnvironmentConfig } from "../types";
import { readFileAsync, tryChangeDirectory } from "./utility";

export type IncompatibleProjectReason =
  | "missing-directory"
  | "non-laravel"
  | "vanilla-laravel";

export const getExtendedIncompatibilityMessage = (
  reason: IncompatibleProjectReason
) => {
  switch (reason) {
    case "missing-directory":
      return "The specified directory does not exist";
    case "non-laravel":
      return "The specified directory does not appear to be a Laravel project";
    case "vanilla-laravel":
      return "The specified directory needs to be converted to use Laravel Up. Run lvl configure";
  }
};

export type LaravelProjectResult =
  | UpEnvironmentConfig
  | IncompatibleProjectReason;

export const isLaravelUpProject = (
  input: LaravelProjectResult
): input is UpEnvironmentConfig => {
  return typeof input !== "string";
};

const verifyLaravelProject = async (
  directory: string
): Promise<LaravelProjectResult> => {
  const result = tryChangeDirectory(directory, false);
  if (!result) {
    return "missing-directory";
  }

  const pwd = shelljs.pwd().toString();

  const lvlUpConfigPath = path.join(pwd, "laravel-up.yml");

  if (!fs.existsSync(lvlUpConfigPath)) {
    return fs.existsSync(path.join(pwd, "composer.json"))
      ? "vanilla-laravel"
      : "non-laravel";
  }

  const contents = await readFileAsync(lvlUpConfigPath);

  const config = jsyaml.load(contents.toString()) as UpEnvironmentConfig;
  return config;
};

export default verifyLaravelProject;
