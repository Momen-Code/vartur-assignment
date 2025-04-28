import { PrismaClient } from "@prisma/client";

export function ProductService(prisma: PrismaClient) {
  return {
    async createProduct(name: string, price: number, categoryId: number) {
      return prisma.product.create({
        data: { name, price, categoryId },
      });
    },

    async getProduct(id: number) {
      return prisma.product.findUnique({
        where: { id },
        include: { category: true },
      });
    },

    async listProducts() {
      return prisma.product.findMany({
        include: { category: true },
      });
    },

    async updateProduct(
      id: number,
      name: string,
      price: number,
      categoryId: number
    ) {
      return prisma.product.update({
        where: { id },
        data: { name, price, categoryId },
      });
    },

    async deleteProduct(id: number) {
      return prisma.product.delete({ where: { id } });
    },
  };
}
