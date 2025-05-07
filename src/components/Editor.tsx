import { EditorContent, BubbleMenu, useEditor } from "@tiptap/react";
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
import { PlusIcon } from "lucide-react";
import NoteColorPicker from "./NoteColorPicker";
import { toast } from "react-toastify";

const Editor = () => {
  const {
    notes,
    selectedNoteId,
    addNote,
    setSelectedNoteId,
    openDialog,
    setOpenDialog,
    selectedFolderId,
  } = useStore();
  const note = notes.find((n) => n?.id === selectedNoteId);
  const [title, setTitle] = useState("");
  const [noteColor, setNoteColor] = useState("#fde68a");
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
  });

  useEffect(() => {
    if (editor) {
      if (isCreatingNote) {
        editor.commands.setContent("");
      }
    }
  }, [isCreatingNote, editor]);

  const handleCreateNote = () => {
    setTitle("");
    setIsCreatingNote(true);
    setSelectedNoteId(null);
    setOpenDialog(true);

    if (editor) {
      editor.commands.setContent("");
    }
  };

  const handleSaveNote = () => {
    if (!selectedNoteId) {
      const newNoteId = nanoid();
      addNote({
        id: newNoteId,
        title: title,
        content: editor ? editor.getHTML() : "",
        updatedAt: Date.now(),
        folderId: "all" && selectedFolderId,
        color: noteColor ?? "#fde68a",
      });
    }
    toast("Note Created!");
    setIsCreatingNote(false);
    setOpenDialog(false);
    setTitle("");
    setSelectedNoteId(null);
  };

  return (
    <div className="flex flex-col fixed right-4 bottom-4">
      <Dialog modal={false} open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <button
            onClick={handleCreateNote}
            className="bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-full flex items-center"
          >
            <PlusIcon size={30} />
          </button>
        </DialogTrigger>
        <DialogContent
          className="font-kalam"
          style={{ backgroundColor: noteColor }}
        >
          <DialogHeader>
            <DialogTitle asChild>
              <input
                type="text"
                value={note?.title ?? title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-2xl bg-transparent font-bold mb-4 p-2 w-full focus:outline-none  rounded"
                placeholder="Note title"
              />
            </DialogTitle>
            <DialogDescription asChild>
              <div>
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
                    className="editor-container prose prose-sm prose-p:!my-[2px] sm:prose  max-w-none border-none ring-offset-transparent focus:outline-none h-[300px] prose-headings:!my-1 overflow-y-auto scrollbar-hide px-2"
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-row items-center justify-end">
            {isCreatingNote && (
              <>
                <div onClick={(e) => e.stopPropagation()}>
                  <NoteColorPicker
                    onChangeColor={(color) => {
                      console.log("color", color);
                      setNoteColor(color);
                    }}
                  />
                </div>
                <button
                  onClick={handleSaveNote}
                  className=" font-semibold hover:bg-[#5f636826] py-1.5 px-2 rounded-lg"
                >
                  Save
                </button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Editor;