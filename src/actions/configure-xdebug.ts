import * as fs from "fs";
import * as path from "path";
import * as envfile from "envfile";
import { writeFileAsync } from ".";
import * as shelljs from "shelljs";

export const configureXdebug = async (location: string, ipAddress: string) => {
  const dockerEnvPath = path.join(location, "environment/docker.env");
  if (!fs.existsSync(dockerEnvPath)) {
    shelljs.cp(
      path.join(location, "environment/.docker.env.example"),
      dockerEnvPath
    );
  }

  const dockerEnvFileContents = envfile.parseFileSync(dockerEnvPath);

  dockerEnvFileContents["PHP_XDEBUG_REMOTE_HOST"] = ipAddress;
  await writeFileAsync(
    dockerEnvPath,
    envfile.stringifySync(dockerEnvFileContents)
  );
};
