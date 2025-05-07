import { EditorContent, BubbleMenu, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { useStore } from "../store/useStore";
import { useEffect, useState, useRef } from "react";
import { nanoid } from "nanoid";
import Toolbar from "./Toolbar";
import NoteColorPicker from "./NoteColorPicker";
import { toast } from "react-toastify";

const Editor = () => {
  const { addNote, selectedFolderId } = useStore();

  const [title, setTitle] = useState("");
  const [noteColor, setNoteColor] = useState("#fde68a");
  const [isExpanded, setIsExpanded] = useState(false);

  const editorContainerRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] } }),
      Underline,
      Link,
      Subscript,
      Superscript,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
  });

  useEffect(() => {
    if (!isExpanded && editor) {
      editor.commands.clearContent();
      setTitle("");
      setNoteColor("#fde68a");
    }
  }, [isExpanded, editor]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        editorContainerRef.current &&
        !editorContainerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  const handleSaveNote = () => {
    if (!editor) return;
    if (!title && editor.getText().trim() === "") {
      toast.error("Note cannot be empty");
      return;
    }

    const newNoteId = nanoid();
    addNote({
      id: newNoteId,
      title: title,
      content: editor.getHTML(),
      updatedAt: Date.now(),
      folderId: "all" && selectedFolderId,
      color: noteColor,
    });

    toast("Note Created!");
    setIsExpanded(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto my-8">
      {/* Collapsed State */}
      {!isExpanded && (
        <div
          onClick={() => setIsExpanded(true)}
          className="flex items-center justify-between bg-white rounded-xl shadow-md px-4 py-3 cursor-text"
        >
          <span className="text-gray-600">Take a note...</span>
        </div>
      )}

      {/* Expanded State */}
      {isExpanded && (
        <div
          ref={editorContainerRef}
          className="flex flex-col rounded-xl shadow-md p-4"
          style={{ backgroundColor: noteColor }}
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="text-lg font-semibold bg-transparent mb-2 outline-none"
          />
          <div className=" rounded-lg flex-grow overflow-y-auto">
            {editor && (
              <>
                <BubbleMenu editor={editor}>
                  <Toolbar editor={editor} />
                </BubbleMenu>
                <EditorContent
                  editor={editor}
                  className="editor-container prose prose-sm prose-p:!my-[2px] sm:prose max-w-none border-none ring-offset-transparent focus:outline-none h-[100px] overflow-y-auto scrollbar-hide px-1"
                />
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mt-3">
            <div>
              <NoteColorPicker onChangeColor={(color) => setNoteColor(color)} />
            </div>
            <div className="flex items-center gap-3">
              {/* Can add undo/redo here */}
              <button
                onClick={handleSaveNote}
                className="text-sm font-medium hover:bg-[#5f636826] px-3 py-1 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-sm font-medium hover:bg-[#5f636826] px-3 py-1 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Editor;