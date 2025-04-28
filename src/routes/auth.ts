import { FastifyInstance } from "fastify";
import { loginHandler } from "../controllers/auth.controller";
import { authSchemas, authTags } from "../docs/auth.docs";

export default async function (fastify: FastifyInstance) {
  fastify.post(
    "/login",
    {
      schema: {
        tags: authTags,
        ...authSchemas.loginRequestBody,
      },
    },
    loginHandler
  );
}
