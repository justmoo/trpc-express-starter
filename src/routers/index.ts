import { t } from "../trpc";
import { z } from "zod";

const appRouter = t.router({
  index: t.procedure
    .meta({
      openapi: {
        path: "/index",
        method: "GET",
      },
    })
    .input(z.void())
    .output(z.string())
    .query(({}) => {
      return "Welcome to trpc example!";
    }),
});

export default appRouter;
