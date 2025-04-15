import { create } from "zustand";
import { Store } from "../types/type";
import { persist } from "zustand/middleware";

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      folders: [],
      notes: [],
      addFolder: () => {},
      addNote: () => {},
      updateNote: () => {},
      deleteNote: () => {},
    }),
    { name: "notes-app-store" }
  )
);