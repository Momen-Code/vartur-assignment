import "fastify";
import { PrismaClient } from "@prisma/client";
import { FastifyRedisNamespace } from "@fastify/redis";
import { JWT } from "@fastify/jwt";

declare module "fastify" {
  interface FastifyRequest {
    jwtVerify: () => Promise<any>;
    user: any;
  }

  interface FastifyInstance {
    prisma: PrismaClient;
    redis: FastifyRedisNamespace;
    jwt: JWT;
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }
}
