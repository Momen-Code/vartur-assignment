export const authSchemas = {
  loginRequestBody: {
    body: {
      type: "object",
      required: ["username", "password"],
      properties: {
        username: { type: "string" },
        password: { type: "string" },
      },
    },
  },
};

export const authTags = ["Auth"];
