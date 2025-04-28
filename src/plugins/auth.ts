import fastifyJwt from "@fastify/jwt";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { config } from "../config/env";

export default fp(async (fastify: FastifyInstance) => {
  fastify.register(fastifyJwt, {
    secret: config.JWT_SECRET,
  });

  fastify.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();

        const authHeader = request.headers.authorization;
        if (!authHeader) {
          return reply
            .status(401)
            .send({ message: "Authorization header missing" });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
          return reply.status(401).send({ message: "Token missing" });
        }

        const tokenExists = await request.server.redis.get(token);
        if (!tokenExists) {
          return reply
            .status(401)
            .send({ message: "Session expired or token invalidated" });
        }
      } catch (err) {
        reply.send(err);
      }
    }
  );
});
