import { FastifyReply, FastifyRequest } from "fastify";
import { ProductService } from "../services/products.service";
import { standardResponse } from "../utils/standard-response";

type CreateProductBody = {
  name: string;
  price: number;
  categoryId: number;
};
type UpdateProductBody = {
  name: string;
  price: number;
  categoryId: number;
};

type ProductParams = {
  id: string;
};

export async function createProductHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const productService = ProductService(request.server.prisma);
  const { name, price, categoryId } = request.body as CreateProductBody;

  const product = await productService.createProduct(name, price, categoryId);

  if (!product) {
    return standardResponse({
      reply,
      statusCode: 400,
      message: "Product creation failed",
      data: null,
    });
  }

  return standardResponse({
    reply,
    statusCode: 201,
    message: "Product created successfully",
    data: product,
  });
}

export async function getProductsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const productService = ProductService(request.server.prisma);

  const products = await productService.listProducts();

  if (!products) {
    return standardResponse({
      reply,
      statusCode: 404,
      message: "Products not found",
      data: null,
    });
  }

  return standardResponse({
    reply,
    message: "Products retrieved successfully",
    data: products,
  });
}

export async function getProductHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const productService = ProductService(request.server.prisma);
  const { id } = request.params as ProductParams;

  const product = await productService.getProduct(Number(id));

  if (!product) {
    return standardResponse({
      reply,
      statusCode: 404,
      message: "Product not found",
      data: null,
    });
  }

  return standardResponse({
    reply,
    message: "Product retrieved successfully",
    data: product,
  });
}

export async function updateProductHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const productService = ProductService(request.server.prisma);
  const { id } = request.params as ProductParams;
  const { name, price, categoryId } = request.body as UpdateProductBody;

  const product = await productService.updateProduct(
    Number(id),
    name,
    price,
    categoryId
  );

  if (!product) {
    return standardResponse({
      reply,
      statusCode: 404,
      message: "Product not found",
      data: null,
    });
  }

  return standardResponse({
    reply,
    message: "Product updated successfully",
    data: product,
  });
}

export async function deleteProductHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const productService = ProductService(request.server.prisma);
  const { id } = request.params as ProductParams;

  await productService.deleteProduct(Number(id));

  return standardResponse({
    reply,
    message: "Product deleted successfully",
    data: null,
  });
}
