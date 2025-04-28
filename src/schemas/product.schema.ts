export const createProductSchema = {
  body: {
    type: "object",
    required: ["name", "price", "categoryId"],
    properties: {
      name: { type: "string" },
      price: { type: "number", minimum: 0 },
      categoryId: { type: "number" },
    },
  },
};

export const updateProductSchema = {
  body: {
    type: "object",
    required: ["name", "price", "categoryId"],
    properties: {
      name: { type: "string" },
      price: { type: "number", minimum: 0 },
      categoryId: { type: "number" },
    },
  },
};
