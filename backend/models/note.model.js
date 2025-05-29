import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  },
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
