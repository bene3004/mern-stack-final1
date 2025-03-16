import express from "express";

import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} from "../controllers/note.controller.js";

const router = express.Router();

router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);
router.get("/", getNotes);

export default router;
