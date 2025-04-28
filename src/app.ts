import { Prisma } from "@prisma/client";
import Fastify from "fastify";
import authPlugin from "./plugins/auth";
import prismaPlugin from "./plugins/prisma";
import redis from "./plugins/redis";
import swagger from "./plugins/swagger";
import authRoutes from "./routes/auth";
import categoryRoutes from "./routes/categories";
import productRoutes from "./routes/products";
import { ApiError } from "./utils/api-error";

const app = Fastify();

app.register(prismaPlugin);
app.register(swagger);
app.register(authPlugin);
app.register(redis);

// Routes
app.register(authRoutes, { prefix: "/auth" });
app.register(categoryRoutes, { prefix: "/categories" });
app.register(productRoutes, { prefix: "/products" });

// Error Handling
app.setErrorHandler((error, request, reply) => {
  request.log.error(error);

  let statusCode = error.statusCode || 500;
  let message = error.message || "Something went wrong";
  let code = undefined;

  if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
    code = error.code;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2003") {
      statusCode = 400;
      message =
        "Invalid reference: related record does not exist (e.g., parent category).";
    }
    if (error.code === "P2002") {
      statusCode = 409;
      message = "Duplicate record: unique constraint violated.";
    }
  }

  reply.status(statusCode).send({
    statusCode,
    error: error.name || "InternalServerError",
    message,
    code,
  });
});

export default app;
