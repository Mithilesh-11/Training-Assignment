import { Request, Response, NextFunction } from "express";
import { OrderService } from "../types/order.types";

export class OrderController {
  constructor(private readonly service: OrderService) {}

  createOrmOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const order = await this.service.createOrder(req.body);

      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  };

  createRawOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const order = await this.service.createOrder(req.body);

      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  };
}