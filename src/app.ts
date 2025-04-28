import { Prisma } from "@prisma/client";
import Fastify from "fastify";
import { config } from "./config/env";
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
  let code: string | undefined = undefined;
  let name = error.name || "InternalServerError";

  if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
    code = error.code;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    name = "DatabaseError";
    switch (error.code) {
      case "P2002":
        statusCode = 409;
        message = "Duplicate record: unique constraint violated.";
        break;
      case "P2003":
        statusCode = 400;
        message = "Invalid reference: related record does not exist.";
        break;
      case "P2025":
        statusCode = 404;
        message = "Record not found.";
        break;
      default:
        statusCode = 500;
        message = "Database error occurred.";
    }
  }

  reply.status(statusCode).send({
    statusCode,
    error: name,
    message,
    ...(code ? { code } : {}),
    ...(config.ENVIRONMENT !== "prod" ? { stack: error.stack } : {}),
  });
});

export default app;
