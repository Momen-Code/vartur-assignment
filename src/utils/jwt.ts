import { FastifyInstance } from "fastify";

export const generateToken = async (fastify: FastifyInstance, payload: any) => {
  return fastify.jwt.sign(payload);
};

export const verifyToken = async (fastify: FastifyInstance, token: string) => {
  return fastify.jwt.verify(token);
};
