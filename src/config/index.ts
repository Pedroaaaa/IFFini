import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const databaseClient = new PrismaClient();
const SERVER_PORT = process.env.SERVER_PORT ?? "3141";
const ORDER_LIMIT = process.env.ORDER_LIMIT ?? "2";

const config = {
  server: {
    port: Number(SERVER_PORT),
  },
  app: {
    orderLimit: Number(ORDER_LIMIT),
  },
};

export { databaseClient, config };
