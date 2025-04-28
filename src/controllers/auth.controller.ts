import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "../services/auth.service";
import { generateToken } from "../utils/jwt";

export async function loginHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { username, password } = request.body as {
    username: string;
    password: string;
  };
  const authService = AuthService(request.server.prisma);

  const user = await authService.login(username, password);

  const token = await generateToken(request.server, {
    id: user.id,
    username: user.username,
    role: user.role,
  });

  await request.server.redis.set(token, JSON.stringify(user), "EX", 3600);

  return reply.code(200).send({ user, token });
}
