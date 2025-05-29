import express from "express";

import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
  readFileAsync,
  getNoteStats
} from "../controllers/note.controller.js";
import cacheMiddleware from "../middleware/cache.js";

const router = express.Router();

router.post("/", cacheMiddleware, createNote);
router.put("/:id", cacheMiddleware, updateNote);
router.delete("/:id", cacheMiddleware, deleteNote);
router.get("/", cacheMiddleware, getNotes);
router.get("/read-file", readFileAsync);
router.get("/stats", cacheMiddleware, getNoteStats);

export default router;
