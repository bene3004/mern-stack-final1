import fs from "fs/promises";
import path from "path";
import mongoose from "mongoose";

import Note from "../models/note.model.js";

export const createNote = async (req, res) => {
  const note = req.body;

  if (!note.heading || !note.description || !note.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the fields" });
  }

  const newNote = new Note(note);

  try {
    await newNote.save();
    res.status(201).json({ success: true, data: newNote });
  } catch (error) {
    console.error("Error in Add note:", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};

export const updateNote = async (req, res) => {
  const { id } = req.params;

  const note = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "invalid note id " });
  }

  try {
    const updatedNote = await Note.findByIdAndUpdate(id, note, { new: true });
    res.status(200).json({ success: true, data: updatedNote });
  } catch (error) {
    res.status(500).json({ success: false, message: "server error" });
  }
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "invalid note id " });
  }

  try {
    await Note.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Note deleted" });
  } catch (error) {
    console.log("error in deleting note:", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({});
    res.status(200).json({ success: true, data: notes });
  } catch (error) {
    console.log("error in fetching notes:", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};

export const readFileAsync = async (req, res) => {
  try {
    const filePath = path.join(process.cwd(), "data", "sample.txt");
    const data = await fs.readFile(filePath, "utf-8"); // Non-blocking file read
    res.status(200).json({ success: true, content: data });
  } catch (error) {
    console.error("error in reading file:", error.message);
    res.status(500).json({ success: false, message: "error in reading file" });
  }
};

// total n notes in the database
export const getTotalAllNotes = async (req, res) => {
  try {
    const result = await Note.aggregate([{ $count: "total" }]);
    const total = result.length > 0 ? result[0].total : 0;
    res.status(200).json({ success: true, total });
  } catch (error) {
    console.error("error in getting total notes:", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
};