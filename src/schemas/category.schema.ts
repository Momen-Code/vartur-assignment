export const createCategorySchema = {
  body: {
    type: "object",
    required: ["name"],
    properties: {
      name: { type: "string" },
      parentId: { type: "number", nullable: true },
    },
  },
};

export const updateCategorySchema = {
  body: {
    type: "object",
    required: ["name"],
    properties: {
      name: { type: "string" },
      parentId: { type: "number", nullable: true },
    },
  },
};
