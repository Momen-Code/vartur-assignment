import { FastifyReply, FastifyRequest } from "fastify";
import { ProductService } from "../services/products.service";

export async function createProductHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const productService = ProductService(request.server.prisma);
  const { name, price, categoryId } = request.body as {
    name: string;
    price: number;
    categoryId: number;
  };

  const product = await productService.createProduct(name, price, categoryId);

  return reply.code(201).send(product);
}

export async function getProductsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const productService = ProductService(request.server.prisma);

  const products = await productService.listProducts();

  return reply.code(200).send(products);
}

export async function updateProductHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const productService = ProductService(request.server.prisma);
  const { id } = request.params as { id: string };
  const { name, price, categoryId } = request.body as {
    name: string;
    price: number;
    categoryId: number;
  };

  const product = await productService.updateProduct(
    Number(id),
    name,
    price,
    categoryId
  );

  return reply.code(200).send(product);
}

export async function deleteProductHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const productService = ProductService(request.server.prisma);
  const { id } = request.params as { id: string };

  await productService.deleteProduct(Number(id));

  return reply.code(204).send();
}
