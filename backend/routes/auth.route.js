import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";

import {
  registerUser,
  loginUser,
  deleteUser,
  getUsers,
  updateUser
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/:id", authenticate, updateUser);
router.delete("/:id", authenticate, deleteUser);
router.get("/", authenticate, getUsers);

export default router;