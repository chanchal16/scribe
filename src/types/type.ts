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
  selectedFolderId: string | null;
  selectedNoteId: string | null;
  setSelectedNoteId: (noteId: string | null) => void;
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  selectFolder: (id: string | null) => void;
  addFolder: (folder: Folder) => void;
  addNote: (note: Note) => void;
  updateNote: (note: Note) => void;
  deleteNote: (id: string) => void;
  updateFolder: (folder: Folder) => void;
  deleteFolder: (id: string) => void;
  moveNoteToFolder: (noteId: string, folderId: string) => void;
};

export type IFolderList = {
  folder: Folder;
  selectedFolderId: string | null;
  setIsCreateFolder: React.Dispatch<React.SetStateAction<boolean>>;
  setFolderName: React.Dispatch<React.SetStateAction<string>>;
};