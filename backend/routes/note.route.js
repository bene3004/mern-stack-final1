import express from "express";

import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
  readFileAsync,
} from '../controllers/note.controller.js';

const router = express.Router();

router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);
router.get("/", getAllNotes);
router.get("/read-file", readFileAsync);
router.get("/total", getAllNotes);

export default router;
