import express from "express";

import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
  readFileAsync,
} from '../controllers/note.controller.js';
import cacheMiddleware from "../middleware/cache.middleware.js";

const router = express.Router();

router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);
router.get("/", cacheMiddleware, getAllNotes);
router.get("/read-file", readFileAsync);
router.get("/total", getAllNotes);

export default router;
