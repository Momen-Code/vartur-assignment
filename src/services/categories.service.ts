import { PrismaClient } from "@prisma/client";

export function CategoryService(prisma: PrismaClient) {
  async function countProducts(categoryId: number): Promise<number> {
    const productsCount = await prisma.product.count({ where: { categoryId } });
    const subcategories = await prisma.category.findMany({
      where: { parentId: categoryId },
    });

    let subcategoriesProductCount = 0;
    for (const sub of subcategories) {
      subcategoriesProductCount += await countProducts(sub.id);
    }

    return productsCount + subcategoriesProductCount;
  }

  return {
    async createCategory(name: string, parentId?: number) {
      return prisma.category.create({
        data: { name, parentId },
      });
    },

    async getCategory(id: number) {
      return prisma.category.findUnique({ where: { id } });
    },

    async updateCategory(id: number, name: string, parentId?: number) {
      return prisma.category.update({
        where: { id },
        data: { name, parentId },
      });
    },

    async deleteCategory(id: number) {
      return prisma.category.delete({ where: { id } });
    },

    async listCategoriesWithProductCount() {
      const categories = await prisma.category.findMany({
        where: { parentId: null },
        include: { children: true },
      });

      const result = await Promise.all(
        categories.map(async (category) => ({
          id: category.id,
          name: category.name,
          parentId: category.parentId,
          productCount: await countProducts(category.id),
        }))
      );

      return result;
    },
  };
}
