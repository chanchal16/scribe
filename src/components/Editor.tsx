import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Note } from "../types/type";

interface EditorProps {
  note: Note;
}

const Editor = ({ note }: EditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: note.content,
    onUpdate: ({ editor }) => {
      console.log("update", editor);
    },
  });
  return (
    <div className="h-full flex flex-col">
      <input
        type="text"
        value={note.title}
        //   onChange={handleTitleChange}
        className="text-2xl font-bold mb-4 p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        placeholder="Note title"
      />

      <div className="border border-blue-500 rounded-lg flex-grow overflow-y-auto">
        <div className="p-4 ">
          <EditorContent editor={editor} className="prose max-w-none" />
        </div>
      </div>

      <div className="mt-2 text-sm text-gray-500">
        Last updated: {new Date(note.updatedAt).toLocaleString()}
      </div>
    </div>
  );
};

export default Editor;