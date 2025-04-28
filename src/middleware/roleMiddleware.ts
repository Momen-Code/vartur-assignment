import { FastifyRequest, FastifyReply } from "fastify";

export function roleGuard(allowedRoles: string[]) {
  return async function (request: FastifyRequest, reply: FastifyReply) {
    const user = request.user as { id: number; username: string; role: string };

    if (!allowedRoles.includes(user.role)) {
      return reply
        .status(403)
        .send({ message: "Forbidden: Insufficient permissions" });
    }
  };
}
