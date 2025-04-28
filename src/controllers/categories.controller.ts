import { FastifyReply, FastifyRequest } from "fastify";
import { CategoryService } from "../services/categories.service";

export async function createCategoryHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const categoryService = CategoryService(request.server.prisma);
  const { name, parentId } = request.body as {
    name: string;
    parentId?: number;
  };

  const category = await categoryService.createCategory(name, parentId);

  return reply.code(201).send(category);
}

export async function getCategoriesHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const categoryService = CategoryService(request.server.prisma);

  const categories = await categoryService.listCategoriesWithProductCount();

  return reply.code(200).send(categories);
}

export async function updateCategoryHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const categoryService = CategoryService(request.server.prisma);
  const { id } = request.params as { id: string };
  const { name, parentId } = request.body as {
    name: string;
    parentId?: number;
  };

  const category = await categoryService.updateCategory(
    Number(id),
    name,
    parentId
  );

  return reply.code(200).send(category);
}

export async function deleteCategoryHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const categoryService = CategoryService(request.server.prisma);
  const { id } = request.params as { id: string };

  await categoryService.deleteCategory(Number(id));

  return reply.code(204).send();
}
