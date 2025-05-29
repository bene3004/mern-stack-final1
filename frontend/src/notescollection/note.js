import { create } from "zustand";

export const useNotesCollection = create((set) => ({
  notes: [],
  setNotes: (notes) => set({ notes }),
  createNote: async (newNote) => {
    if (!newNote.heading || !newNote.image || !newNote.description) {
      return { success: false, message: "Please fill in all the fields" };
    }
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    });
    
    const data = await res.data.json();
    set((state) => ({ notes: [...state.notes, data.data] }));
    return { success: true, message: "Note added successfully" };
  },
}));
