import { create } from "zustand";
import { Store } from "../types/type";
import { persist } from "zustand/middleware";

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      folders: [],
      notes: [],
      selectedNoteId: null,
      setSelectedNoteId: (noteId) => set({ selectedNoteId: noteId }),
      openDialog:false,
      setOpenDialog:(open)=>set({openDialog:open}),
      addFolder: () => {},
      addNote: (note) =>
        set((prevState) => ({ notes: [...prevState.notes, note] })),
      updateNote: (note) =>
        set((state) => ({
          notes: state.notes.map((n) => (n.id === note.id ? note : n)),
        })),
      deleteNote: (id) => set((state)=>({notes:state.notes.filter(note=>note.id !== id)})),
    }),
    { name: "notes-app-store" }
  )
);