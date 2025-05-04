import { searchNotes } from "@/lib/searchNotes";
import { useStore } from "../store/useStore";
import { useState } from "react";
import FoldersPopover from "./FoldersPopover";

const NotesList = () => {
  const [openPopoverNoteId, setOpenPopoverNoteId] = useState<string | null>(
    null
  );

  const {
    notes,
    setSelectedNoteId,
    setOpenDialog,
    searchQuery,
    selectedFolderId,
  } = useStore();
  const filteredNotesByFolder = notes.filter(
    (note) => selectedFolderId === "all" || note.folderId === selectedFolderId
  );
  const filteredNotes = searchNotes(
    filteredNotesByFolder,
    searchQuery.toLowerCase()
  );

  return (
    <div className="flex flex-wrap gap-4 items-center p-4">
      {filteredNotes.map((note) => (
        <div
          key={note.id}
          className={`py-2 px-3 w-52 min-h-32 relative rounded bg-amber-100 hover:bg-amber-50 cursor-pointer`}
        >
          <div
            className="flex flex-col gap-3"
            onClick={() => {
              if (openPopoverNoteId !== note.id) {
                setSelectedNoteId(note.id);
                setOpenDialog(true);
              }
            }}
          >
            <p className="font-medium truncate">
              {note.title || "Untitled Note"}
            </p>
            <div
              dangerouslySetInnerHTML={{ __html: note.content }}
              className="truncate"
            />
          </div>
          <div className=" flex flex-row justify-between w-[85%] absolute bottom-2">
            <span className="text-xs text-amber-600 ">
              {new Date(note.updatedAt).toLocaleString()}
            </span>
            <FoldersPopover note={note} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesList;