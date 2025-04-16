import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useStore } from "../store/useStore";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

const Editor = () => {
  const { notes, selectedNoteId, updateNote, addNote, setSelectedNoteId } =
    useStore();
  const note = notes.find((n) => n?.id === selectedNoteId);
  const [title, setTitle] = useState("");
  const [isCreatingNote, setIsCreatingNote] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: note?.content ?? "",
    onUpdate: ({ editor }) => {
      if (selectedNoteId && note) {
        // Update existing note
        updateNote({
          ...note,
          content: editor.getHTML(),
          updatedAt: Date.now(),
        });
      }
    },
  });

  useEffect(() => {
    if (editor) {
      if (note) {
        editor.commands.setContent(note.content || "");
      } else if (isCreatingNote) {
        editor.commands.setContent("");
      }
    }
  }, [note?.id, isCreatingNote, editor]);

  // Function to handle creating a new note
  const handleCreateNote = () => {
    setTitle("");
    setIsCreatingNote(true);
    setSelectedNoteId(null);

    if (editor) {
      editor.commands.setContent("");
    }
  };

  // Function to save a new note
  const handleSaveNote = () => {
    if (!selectedNoteId) {
      const newNoteId = nanoid();
      addNote({
        id: newNoteId,
        title: title,
        content: editor ? editor.getHTML() : "",
        updatedAt: Date.now(),
        folderId: "all",
      });
    }

    setIsCreatingNote(false);
    setTitle("");
    setSelectedNoteId(null);
  };

  // Function to handle title change
  const handleTitleChange = (e: any) => {
    if (note) {
      updateNote({ ...note, title: e.target.value, updatedAt: Date.now() });
    } else {
      setTitle(e.target.value);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleCreateNote}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Note
        </button>

        {(isCreatingNote || selectedNoteId) && (
          <button
            onClick={handleSaveNote}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
          >
            Save Note
          </button>
        )}
      </div>

      {!note && !isCreatingNote ? (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <h3 className="text-xl font-medium mb-2">No note selected</h3>
            <p>
              Select a note from the list or click "Add Note" to create a new
              one
            </p>
          </div>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={note?.title ?? title}
            onChange={handleTitleChange}
            className="text-2xl font-bold mb-4 p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            placeholder="Note title"
          />

          <div className="border border-blue-500 rounded-lg flex-grow overflow-y-auto">
            <div className="p-4">
              <EditorContent editor={editor} className="prose max-w-none" />
            </div>
          </div>

          {note && (
            <div className="mt-2 text-sm text-gray-500">
              Last updated: {new Date(note.updatedAt).toLocaleString()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Editor;