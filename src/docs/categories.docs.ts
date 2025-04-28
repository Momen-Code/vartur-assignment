export const categorySchemas = {
  createCategoryBody: {
    body: {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
        parentId: { type: "number", nullable: true },
      },
    },
  },
  updateCategoryBody: {
    body: {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
        parentId: { type: "number", nullable: true },
      },
    },
  },
};

export const categoryTags = ["Categories"];
