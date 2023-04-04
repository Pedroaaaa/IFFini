import { Express } from "../../types/express";
import AuthController from "../../controllers/AuthController";

export default (app: Express) => {
  app.route("/auth").post(AuthController.authenticate);
};
