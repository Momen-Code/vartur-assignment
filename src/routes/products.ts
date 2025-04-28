import { FastifyInstance } from "fastify";
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  getProductsHandler,
  updateProductHandler,
} from "../controllers/products.controller";
import { productSchemas, productTags } from "../docs/products.docs";
import { roleGuard } from "../middleware/roleMiddleware";

export default async function (fastify: FastifyInstance) {
  fastify.get(
    "/",
    {
      preHandler: [fastify.authenticate],
      schema: { tags: productTags },
    },
    getProductsHandler
  );

  fastify.get(
    "/:id",
    {
      preHandler: [fastify.authenticate],
      schema: { tags: productTags },
    },
    getProductHandler
  );

  fastify.post(
    "/",
    {
      preHandler: [fastify.authenticate, roleGuard(["admin"])],
      schema: { tags: productTags, ...productSchemas.createProductBody },
    },
    createProductHandler
  );

  fastify.put(
    "/:id",
    {
      preHandler: [fastify.authenticate, roleGuard(["admin"])],
      schema: { tags: productTags, ...productSchemas.updateProductBody },
    },
    updateProductHandler
  );

  fastify.delete(
    "/:id",
    {
      preHandler: [fastify.authenticate, roleGuard(["admin"])],
      schema: { tags: productTags },
    },
    deleteProductHandler
  );
}
