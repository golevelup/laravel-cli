import { RedisServiceConfig } from "./service-types";

export const makeRedisService = (config: RedisServiceConfig) => ({
  image: "redis:latest",
  ports: [`${config.port}:6379`]
});
