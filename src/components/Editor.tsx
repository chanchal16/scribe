import {
  EditorContent,
  FloatingMenu,
  BubbleMenu,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { useStore } from "../store/useStore";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Toolbar from "./Toolbar";

const Editor = () => {
  const {
    notes,
    selectedNoteId,
    updateNote,
    addNote,
    setSelectedNoteId,
    openDialog,
    setOpenDialog,
  } = useStore();
  const note = notes.find((n) => n?.id === selectedNoteId);
  const [title, setTitle] = useState("");
  const [isCreatingNote, setIsCreatingNote] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Underline,
      Link,
      Subscript,
      Superscript,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
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
    setOpenDialog(true);

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
    setOpenDialog(false);
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
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handleCreateNote}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center"
            >
              Add Note
            </button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle asChild>
              <input
                type="text"
                value={note?.title ?? title}
                onChange={handleTitleChange}
                className="text-2xl font-bold mb-4 p-2 w-full focus:outline-none  rounded"
                placeholder="Note title"
              />
            </DialogTitle>
            <DialogDescription asChild>
              <>
                <div className=" rounded-lg flex-grow overflow-y-auto">
                  <div className="control-group">
                    {editor && (
                      <BubbleMenu editor={editor}>
                        <Toolbar editor={editor} />
                      </BubbleMenu>
                    )}
                  </div>
                  <EditorContent
                    editor={editor}
                    className="editor-container prose prose-sm prose-p:!my-[2px] sm:prose  max-w-none border-none ring-offset-transparent focus:outline-none h-[300px] prose-headings:!my-1 overflow-y-auto px-2"
                  />
                </div>

                {note && (
                  <div className="mt-2 text-sm text-gray-500">
                    Last updated: {new Date(note.updatedAt).toLocaleString()}
                  </div>
                )}
              </>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            {(isCreatingNote || selectedNoteId) && (
              <button
                onClick={handleSaveNote}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
              >
                Save Note
              </button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Editor;