import { Router } from "express";
import { OrderController } from "../controllers/order.controller";
import { OrderOrmService } from "../services/orderOrm.service";
import { OrderRawService } from "../services/orderRaw.service";

const router = Router();

const ormController = new OrderController(new OrderOrmService());
const rawController = new OrderController(new OrderRawService());

router.post("/orm", ormController.createOrmOrder);

router.post("/raw", rawController.createRawOrder);

export default router;