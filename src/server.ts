import app from "./app";
import { config } from "./config/env";

const start = async () => {
  try {
    await app.listen({
      port: Number(config.PORT) || 3000,
      host: "0.0.0.0",
    });
    console.log(`Server running on port ${config.PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
