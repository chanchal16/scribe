import { searchNotes } from "@/lib/searchNotes";
import { useStore } from "../store/useStore";

const NotesList = () => {
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
          className={`py-2 px-3 w-52 min-h-32 flex flex-col gap-3 relative  rounded bg-amber-100 hover:bg-amber-50 cursor-pointer`}
          onClick={() => {
            setSelectedNoteId(note.id);
            setOpenDialog(true);
          }}
        >
          <p className="font-medium truncate">
            {note.title || "Untitled Note"}
          </p>
          <div
            dangerouslySetInnerHTML={{ __html: note.content }}
            className="truncate"
          />
          <p className="text-xs text-amber-600 absolute bottom-2">
            {new Date(note.updatedAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default NotesList;