import { Express, Request, Response, NextFunction } from "../../types/express";

export default (app: Express) => {
  app.get("/candy", (req: Request, res: Response, next: NextFunction) =>
    res.status(200).json({ message: ["🍌", "🦷", "💋", "🐛", "🍬"] })
  );
};
