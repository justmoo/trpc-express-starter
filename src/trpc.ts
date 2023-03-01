import { initTRPC, inferAsyncReturnType } from "@trpc/server";
import { createContext } from "./context";
import { OpenApiMeta } from "trpc-openapi";

export const t = initTRPC
  .meta<OpenApiMeta>()
  .context<inferAsyncReturnType<typeof createContext>>()
  .create();
