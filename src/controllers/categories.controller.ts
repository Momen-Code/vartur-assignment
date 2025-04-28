import { FastifyReply, FastifyRequest } from "fastify";
import { CategoryService } from "../services/categories.service";
import { standardResponse } from "../utils/standard-response";

type CreateCategoryRequest = {
  name: string;
  parentId?: number;
};

type UpdateCategoryRequest = {
  name: string;
  parentId?: number;
};

type CategoryParams = {
  id: string;
};

export async function createCategoryHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const categoryService = CategoryService(request.server.prisma);
  const { name, parentId } = request.body as CreateCategoryRequest;

  const category = await categoryService.createCategory(name, parentId);

  if (!category) {
    return standardResponse({
      reply,
      statusCode: 400,
      message: "Category creation failed",
      data: null,
    });
  }

  return standardResponse({
    reply,
    statusCode: 201,
    message: "Category created successfully",
    data: category,
  });
}

export async function getCategoriesHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const categoryService = CategoryService(request.server.prisma);

  const categories = await categoryService.listCategoriesWithProductCount();

  if (!categories) {
    return standardResponse({
      reply,
      statusCode: 404,
      message: "Categories not found",
      data: null,
    });
  }

  return standardResponse({
    reply,
    message: "Categories retrieved successfully",
    data: categories,
  });
}

export async function getCategoryHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const categoryService = CategoryService(request.server.prisma);
  const { id } = request.params as CategoryParams;

  const category = await categoryService.getCategory(Number(id));

  if (!category) {
    return standardResponse({
      reply,
      statusCode: 404,
      message: "Category not found",
      data: null,
    });
  }

  return standardResponse({
    reply,
    message: "Category retrieved successfully",
    data: category,
  });
}

export async function updateCategoryHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const categoryService = CategoryService(request.server.prisma);
  const { id } = request.params as CategoryParams;
  const { name, parentId } = request.body as UpdateCategoryRequest;

  const category = await categoryService.updateCategory(
    Number(id),
    name,
    parentId
  );

  if (!category) {
    return standardResponse({
      reply,
      statusCode: 404,
      message: "Category not found",
      data: null,
    });
  }

  return standardResponse({
    reply,
    message: "Category updated successfully",
    data: category,
  });
}

export async function deleteCategoryHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const categoryService = CategoryService(request.server.prisma);
  const { id } = request.params as CategoryParams;

  await categoryService.deleteCategory(Number(id));

  return standardResponse({
    reply,
    message: "Category deleted successfully",
    data: null,
  });
}
