import dotenv from "dotenv";
dotenv.config();

import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import connectDB from "./src/config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

async function registerRoutes(app) {
  const routesPath = path.join(__dirname, "src", "routes");

  console.log("📌 Registering routes:\n");

  const files = fs.readdirSync(routesPath);

  for (const file of files) {
    if (!file.endsWith(".rt.js")) continue;

    try {
      const routeName = file.replace(".rt.js", "");
      const routePath = `/api/${routeName}`;

      const filePath = path.join(routesPath, file);
      const routeModule = await import(
        pathToFileURL(filePath).href
      );

      app.use(routePath, routeModule.default);  

      console.log(`✔ ${routePath}`);
    } catch (err) {
      console.error(`❌ Failed to load route: ${file}`, err);
      process.exit(1);
    }
  }

  console.log("\n✅ All routes registered\n");
}

const startServer = async () => {
    await registerRoutes(app);
    await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
