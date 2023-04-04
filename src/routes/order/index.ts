import OrderController from "../../controllers/OrderController";
import { Express } from "../../types/express";

export default (app: Express) => {
  app.route("/order").get(OrderController.findAll).post(OrderController.create);
  app.route("/order/:ip").get(OrderController.findByCostumerIp);
  app.route("/order/validate/:id").post(OrderController.validate);
};
