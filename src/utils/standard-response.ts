import { FastifyReply } from "fastify";

export interface StandardResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export function standardResponse<T>(params: {
  reply: FastifyReply;
  statusCode?: number;
  message: string;
  data: T;
}) {
  const { reply, statusCode = 200, message, data } = params;

  return reply.status(statusCode).send({
    success: true,
    message,
    data,
  });
}
