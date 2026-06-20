import express from "express";

import {
  addOrder,
  getOrders,
  deleteOrder,
  updateOrder,
} from "../controllers/orderController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/add",
  authMiddleware,
  addOrder
);

router.get(
  "/",
  authMiddleware,
  getOrders
);

router.put(
  "/:id",
  authMiddleware,
  updateOrder
);

router.delete(
  "/:id",
  authMiddleware,
  deleteOrder
);

export default router;