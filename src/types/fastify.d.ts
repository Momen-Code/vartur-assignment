import "fastify";
import { PrismaClient } from "@prisma/client";
import { FastifyRedisNamespace } from "@fastify/redis";
import { JWT } from "@fastify/jwt";

export type UserPayload = {
  id: number;
  username: string;
  role: string;
};

declare module "fastify" {
  interface FastifyRequest {
    jwtVerify: () => Promise<UserPayload>;
    user: UserPayload;
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
