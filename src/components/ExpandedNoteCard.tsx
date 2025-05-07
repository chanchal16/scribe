import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useStore } from "../store/useStore";
import NoteColorPicker from "./NoteColorPicker";
import FoldersPopover from "./FoldersPopover";
import { Trash } from "lucide-react";
import { Note } from "@/types/type";

const ExpandedNoteCard = ({ note }: { note: Note }) => {
  const { updateNote, deleteNote, setExpandedNoteId } = useStore();

  const editor = useEditor({
    extensions: [StarterKit],
    content: note.content,
    onUpdate: ({ editor }) => {
      updateNote({
        ...note,
        content: editor.getHTML(),
        updatedAt: Date.now(),
        color: note.color,
      });
    },
  });

  return (
    <div className="relative h-full">
      <input
        value={note.title}
        onChange={(e) =>
          updateNote({ ...note, title: e.target.value, updatedAt: Date.now() })
        }
        className="text-xl bg-transparent font-bold mb-4 p-2 w-full focus:outline-none rounded"
        placeholder="Note title"
      />
      {editor && (
        <EditorContent
          editor={editor}
          className="prose editor-container max-w-none border-none focus:outline-none h-[200px] overflow-y-auto scrollbar-hide"
        />
      )}

      <div className="w-full flex items-center justify-between absolute bottom-0 mt-4">
        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
          <NoteColorPicker
            note={note}
            onChangeColor={(color) => {
              updateNote({ ...note, color });
            }}
          />
          <FoldersPopover note={note} />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              deleteNote(note.id);
              setExpandedNoteId(null);
            }}
            className="p-2 hover:bg-[#5f636826] hover:rounded-full"
          >
            <Trash size={18} />
          </button>
          <button
            onClick={() => setExpandedNoteId(null)}
            className=" font-semibold hover:bg-[#5f636826] py-1.5 px-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpandedNoteCard;