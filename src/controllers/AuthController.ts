import { Request, Response, NextFunction } from "../types/express";
import { config } from "../config";
import OrderController from "./OrderController";

class AuthController {
  async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const ip = req.ip || req.socket.remoteAddress!;
      const orders = await OrderController.findTodayByCostumerIp(ip);
      if (orders.length < config.app.orderLimit) {
        return res.json({ message: "Success" });
      } else {
        throw new Error("Unauthorized");
      }
    } catch (error: any) {
      return res.status(403).json({ message: error.message || error });
    }
  }
}

export default new AuthController();
