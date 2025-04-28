import { FastifyInstance } from "fastify";
import {
  createCategoryHandler,
  deleteCategoryHandler,
  getCategoriesHandler,
  getCategoryHandler,
  updateCategoryHandler,
} from "../controllers/categories.controller";
import { categorySchemas, categoryTags } from "../docs/categories.docs";
import { roleGuard } from "../middleware/roleMiddleware";

export default async function (fastify: FastifyInstance) {
  fastify.get(
    "/",
    {
      preHandler: [fastify.authenticate],
      schema: { tags: categoryTags, security: [{ bearerAuth: [] }] },
    },
    getCategoriesHandler
  );

  fastify.get(
    "/:id",
    {
      preHandler: [fastify.authenticate],
      schema: {
        tags: categoryTags,
        security: [{ bearerAuth: [] }],
      },
    },
    getCategoryHandler
  );

  fastify.post(
    "/",
    {
      preHandler: [fastify.authenticate, roleGuard(["admin"])],
      schema: {
        tags: categoryTags,
        ...categorySchemas.createCategoryBody,
        security: [{ bearerAuth: [] }],
      },
    },
    createCategoryHandler
  );

  fastify.put(
    "/:id",
    {
      preHandler: [fastify.authenticate, roleGuard(["admin"])],
      schema: {
        tags: categoryTags,
        ...categorySchemas.updateCategoryBody,
        security: [{ bearerAuth: [] }],
      },
    },
    updateCategoryHandler
  );

  fastify.delete(
    "/:id",
    {
      preHandler: [fastify.authenticate, roleGuard(["admin"])],
      schema: { tags: categoryTags, security: [{ bearerAuth: [] }] },
    },
    deleteCategoryHandler
  );
}
