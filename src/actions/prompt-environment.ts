import * as inquirer from "inquirer";
import { MARIA, MYSQL, POSTGRES } from "../constants";

type ThenArg<T> = T extends Promise<infer U> ? U : T;
export type PromptEnvironmentDef = ThenArg<
  ReturnType<typeof promptEnvironment>
>;

export const promptEnvironment = async () => {
  const dbPrompt = await inquirer.prompt([
    {
      name: "webPort",
      message: "What port would you like the app to be hosted on locally?",
      default: 8080,
      type: "number"
    },
    {
      name: "engine",
      message: "What Database engine would you like to use?",
      type: "list",
      choices: [
        {
          name: MYSQL
        },
        {
          name: POSTGRES
        },
        {
          name: MARIA
        }
      ]
    },
    {
      name: "dbHostPort",
      message:
        "What port would you like the DB to be available on your host machine?",
      default: (prompt: any) => (prompt.engine === POSTGRES ? 5432 : 3306),
      type: "number"
    },
    {
      name: "dbRootPassword",
      message: "What is the Database Root password (for local development)?",
      default: "secret",
      type: "input"
    },
    {
      name: "dbName",
      message: "What is the database name?",
      default: "homestead",
      type: "input"
    },
    {
      name: "redis",
      message: "Would you like to add redis?",
      default: false,
      type: "confirm"
    },
    {
      name: "redisPort",
      message:
        "What port would you like redis to be available on your host machine?",
      default: 6379,
      type: "number",
      when: (prompt: any) => prompt.redis
    }
  ]);

  return dbPrompt;
};
