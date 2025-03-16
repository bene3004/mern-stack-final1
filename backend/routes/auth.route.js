import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";

import {
  registerUser,
  loginUser,
  deleteUser,
  getUsers,
  updateUser,
  readFileAsync,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/:id", authenticate, updateUser);
router.delete("/:id", authenticate, deleteUser);
router.get("/", authenticate, getUsers);
router.get("/read-file", authenticate, readFileAsync);

export default router;