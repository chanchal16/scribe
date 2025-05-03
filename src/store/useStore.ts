import { create } from "zustand";
import { Store } from "../types/type";
import { persist } from "zustand/middleware";

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      folders: [
        {
          id: "all",
          name: "All",
          color: "#6b7280",
        },
      ],
      notes: [],
      selectedNoteId: null,
      selectedFolderId: null,
      setSelectedNoteId: (noteId) => set({ selectedNoteId: noteId }),
      openDialog: false,
      setOpenDialog: (open) => set({ openDialog: open }),
      searchQuery: "",
      setSearchQuery: (value) => set({ searchQuery: value }),
      addFolder: (folder) =>
        set((prevState) => ({ folders: [...prevState.folders, folder] })),
      selectFolder: (id) => set({ selectedFolderId: id, selectedNoteId: null }),
      addNote: (note) =>
        set((prevState) => ({ notes: [...prevState.notes, note] })),
      updateNote: (note) =>
        set((state) => ({
          notes: state.notes.map((n) => (n.id === note.id ? note : n)),
        })),
      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        })),
      updateFolder: (folder) =>
        set((prevState) => ({
          folders: prevState.folders.map((f) =>
            f.id === folder.id ? folder : f
          ),
        })),
      deleteFolder: (id) =>
        set((state) => ({
          folders: state.folders.filter((folder) => folder.id !== id),
        })),
      moveNoteToFolder: (noteId: string, folderId: string) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === noteId ? { ...note, folderId } : note
          ),
        }));
      },
    }),
    { name: "notes-app-store" }
  )
);