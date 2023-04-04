import express from "express";
import apiRules from "../middlewares/apiRules";
import requestLogger from "../middlewares/requestLogger";
import router from "../routes";

export default () => {
  const app = express();
  app.set("trust proxy", true);
  app.use(requestLogger);
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(apiRules);
  router(app);
  return app;
};
