export const productSchemas = {
  createProductBody: {
    body: {
      type: "object",
      required: ["name", "price", "categoryId"],
      properties: {
        name: { type: "string" },
        price: { type: "number", minimum: 0 },
        categoryId: { type: "number" },
      },
    },
  },
  updateProductBody: {
    body: {
      type: "object",
      required: ["name", "price", "categoryId"],
      properties: {
        name: { type: "string" },
        price: { type: "number", minimum: 0 },
        categoryId: { type: "number" },
      },
    },
  },
};

export const productTags = ["Products"];
