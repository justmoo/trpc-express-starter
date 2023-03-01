import * as trpcExpress from "@trpc/server/adapters/express";
import { prisma } from "./config/db";
import jwt from "jsonwebtoken";

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  function getUserFromToken() {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return null;
    try {
      return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      return null;
    }
  }

  return {
    req,
    res,
    prisma,
    user: getUserFromToken(),
  };
};
