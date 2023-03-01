import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["error"],
  errorFormat: "minimal",
});

const connectDb = async () => {
  try {
    await prisma.$connect();
    console.info("Database Connected ✅");
  } catch (error) {
    console.error("unable to connect to database ❌");

    process.exit(1);
  }
};

export { connectDb, prisma };
