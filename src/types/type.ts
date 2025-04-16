export type Folder = {
  id: string;
  name: string;
  color: string; // hex or tailwind class
};

export type Note = {
  id: string;
  folderId?: string;
  title: string;
  content: string; // stored as Tiptap JSON
  updatedAt: number;
};

export type Store = {
  folders: Folder[];
  notes: Note[];
  selectedNoteId: string | null;
  setSelectedNoteId: (noteId: string | null) => void;
  addFolder: (folder: Folder) => void;
  addNote: (note: Note) => void;
  updateNote: (note: Note) => void;
  deleteNote: (id: string) => void;
};