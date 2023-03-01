import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import appRouter from "./routers";
import { createContext } from "./context";
import {
  createOpenApiExpressMiddleware,
  generateOpenApiDocument,
} from "trpc-openapi";
import helmet from "helmet";

import { renderTrpcPanel } from "trpc-panel";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import { connectDb } from "./config/db";

// Generate OpenAPI schema document
export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "Example API",
  description: "Example API",
  version: "1.0.0",
  baseUrl: "http://localhost:3000/api",
  tags: ["users", "posts"],
});

const app = express();
app.use(cors());

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

connectDb();

app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.use(
  "/api",
  createOpenApiExpressMiddleware({ router: appRouter, createContext })
);

app.use("/panel", (_, res) => {
  res.send(
    renderTrpcPanel(appRouter, {
      url: "/trpc",
    })
  );
});

// Serve Swagger UI with our OpenAPI schema
app.use(
  "/docs",
  swaggerUi.serveFiles(openApiDocument),
  swaggerUi.setup(openApiDocument)
);

export default app;
