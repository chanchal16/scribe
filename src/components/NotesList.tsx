import { useStore } from "../store/useStore";

const NotesList = () => {
  const { notes, selectedNoteId, setSelectedNoteId } = useStore();
  return (
    <div className="flex flex-wrap gap-4 items-center border-l border-r p-4">
      {notes.map((note) => (
        <div
          key={note.id}
          className={`p-2 w-52 border rounded cursor-pointer ${
            selectedNoteId === note.id ? "bg-blue-100" : "hover:bg-gray-50"
          }`}
          onClick={() => setSelectedNoteId(note.id)}
        >
          <p className="font-medium truncate">
            {note.title || "Untitled Note"}
          </p>
          <div dangerouslySetInnerHTML={{ __html: note.content }} />
          <p className="text-xs text-gray-500">
            {new Date(note.updatedAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default NotesList;