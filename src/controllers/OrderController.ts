import { Request, Response, NextFunction } from "../types/express";
import { databaseClient } from "../config";

class OrderController {
  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const order = await databaseClient.order.update({
        where: { id: Number(id) },
        data: {
          finished: true,
        },
      });
      return res.json(order);
    } catch (error: any) {
      return res.status(500).json({ message: error.message || error });
    }
  }

  async findTodayByCostumerIp(ip: string) {
    return await databaseClient.order.findMany({
      where: {
        costumerIp: ip,
        createdAt: {
          gte: new Date(new Date().toISOString().split("T")[0]),
        },
      },
    });
  }

  async findByCostumerIp(req: Request, res: Response, next: NextFunction) {
    try {
      const { ip } = req.params;
      const orders = await databaseClient.order.findMany({
        where: {
          costumerIp: ip,
        },
      });
      return res.json(orders);
    } catch (error: any) {
      return res.status(500).json({ message: error.message || error });
    }
  }

  async validate(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const ip = req.body.ip || req.ip || req.socket.remoteAddress!;
      const order = await databaseClient.order.findUniqueOrThrow({
        where: {
          id: Number(id),
        },
      });
      if (order.costumerIp !== ip || order.finished) {
        throw new Error("Invalid order");
      }
      return res.json({ id, ip });
    } catch (error: any) {
      return res.status(500).json({ message: error.message || error });
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await databaseClient.order.findMany();
      return res.json(orders);
    } catch (error: any) {
      return res.status(500).json({ message: error.message || error });
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const order = req.body;
      const ip = req.ip || req.socket.remoteAddress!;
      order.costumerIp = ip;
      const Order = await databaseClient.order.create({ data: order });
      return res.status(201).json(Order);
    } catch (error: any) {
      return res.status(500).json({ message: error.message || error });
    }
  }
}

export default new OrderController();
