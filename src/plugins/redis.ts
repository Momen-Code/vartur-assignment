import Redis from "@fastify/redis";
import fp from "fastify-plugin";
import { config } from "../config/env";

export default fp(async (fastify) => {
  await fastify.register(Redis, { url: config.REDIS_URL });
});
