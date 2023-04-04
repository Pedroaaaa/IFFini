import { Express } from "../types/express";
import auth from "./auth";
import healthCheck from "./healthCheck";
import notFound from "./notFound";
import order from "./order";

export default (app: Express) => {
  order(app);
  auth(app);
  healthCheck(app);
  notFound(app);
};
