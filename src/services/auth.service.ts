import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export function AuthService(prisma: PrismaClient) {
  return {
    async login(username: string, password: string) {
      const user = await prisma.user.findUnique({ where: { username } });

      if (!user) {
        throw new Error("Invalid credentials");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error("Invalid credentials");
      }

      return { id: user.id, username: user.username, role: user.role };
    },
  };
}
