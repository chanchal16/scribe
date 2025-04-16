import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Underline,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link2,
  Eraser,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Subscript,
  Superscript,
} from "lucide-react";
import { useCallback } from "react";

interface ToolbarProps {
  editor: Editor | null;
}

const Toolbar = ({ editor }: ToolbarProps) => {
  if (!editor) return null;

  const isActive = useCallback(
    (type: string, attrs: Record<string, any> = {}) => {
      return editor.isActive(type, attrs);
    },
    [editor]
  );

  const apply = useCallback(
    (fn: () => void) => {
      fn();
      editor.chain().focus().run();
    },
    [editor]
  );

  return (
    <div className="flex flex-wrap items-center gap-2 border border-gray-300 p-2 rounded bg-white mb-2">
      {/* Undo / Redo */}
      <button
        onClick={() => apply(() => editor.chain().undo().run())}
        className={isActive("history") ? "text-black" : "text-gray-400"}
      >
        <Undo />
      </button>
      <button
        onClick={() => apply(() => editor.chain().redo().run())}
        className={isActive("history") ? "text-black" : "text-gray-400"}
      >
        <Redo />
      </button>

      {/* Headings */}
      <div className="flex gap-1">
        <button
          onClick={() =>
            apply(() => editor?.chain().toggleHeading({ level: 1 }).run())
          }
          className={
            isActive("heading", { level: 1 })
              ? "text-gray-700"
              : "text-gray-400"
          }
        >
          <Heading1 />
        </button>
        <button
          onClick={() =>
            apply(() => editor.chain().toggleHeading({ level: 2 }).run())
          }
          className={
            isActive("heading", { level: 2 })
              ? "text-gray-700"
              : "text-gray-400"
          }
        >
          <Heading2 />
        </button>
        <button
          onClick={() =>
            apply(() => editor.chain().toggleHeading({ level: 3 }).run())
          }
          className={
            isActive("heading", { level: 3 })
              ? "text-gray-700"
              : "text-gray-400"
          }
        >
          <Heading3 />
        </button>
      </div>

      {/* Lists */}
      <button
        onClick={() => apply(() => editor.chain().toggleBulletList().run())}
        className={isActive("bulletList") ? "text-gray-700" : "text-gray-400"}
      >
        <List />
      </button>
      <button
        onClick={() => apply(() => editor.chain().toggleOrderedList().run())}
        className={isActive("orderedList") ? "text-gray-700" : "text-gray-400"}
      >
        <ListOrdered />
      </button>

      {/* Blockquote */}
      <button
        onClick={() => apply(() => editor.chain().toggleBlockquote().run())}
        className={isActive("blockquote") ? "text-gray-700" : "text-gray-400"}
      >
        <Quote />
      </button>

      {/* Bold, Italic, Underline, Strike, Code */}
      <button
        onClick={() => apply(() => editor.chain().toggleBold().run())}
        className={isActive("bold") ? "text-gray-700" : "text-gray-400"}
      >
        <Bold />
      </button>
      <button
        onClick={() => apply(() => editor.chain().toggleItalic().run())}
        className={isActive("italic") ? "text-gray-700" : "text-gray-400"}
      >
        <Italic />
      </button>
      <button
        onClick={() => apply(() => editor.chain().toggleStrike().run())}
        className={isActive("strike") ? "text-gray-700" : "text-gray-400"}
      >
        <Strikethrough />
      </button>
      <button
        onClick={() => apply(() => editor.chain().toggleCode().run())}
        className={isActive("code") ? "text-gray-700" : "text-gray-400"}
      >
        <Code />
      </button>
      <button
        onClick={() => apply(() => editor.chain().toggleUnderline().run())}
        className={isActive("underline") ? "text-gray-700" : "text-gray-400"}
      >
        <Underline />
      </button>

      {/* Clear Formatting */}
      <button
        onClick={() =>
          apply(() => editor.chain().unsetAllMarks().clearNodes().run())
        }
        className="text-gray-400"
      >
        <Eraser />
      </button>

      {/* Link */}
      <button
        onClick={() => {
          const url = window.prompt("Enter URL");
          if (url) {
            apply(() => editor.chain().setLink({ href: url }).run());
          }
        }}
        className={isActive("link") ? "text-gray-700" : "text-gray-400"}
      >
        <Link2 />
      </button>

      {/* Superscript / Subscript */}
      <button
        onClick={() => apply(() => editor.chain().toggleSuperscript().run())}
        className={isActive("superscript") ? "text-gray-700" : "text-gray-400"}
      >
        <Superscript />
      </button>
      <button
        onClick={() => apply(() => editor.chain().toggleSubscript().run())}
        className={isActive("subscript") ? "text-gray-700" : "text-gray-400"}
      >
        <Subscript />
      </button>

      {/* Align */}
      <button
        onClick={() => apply(() => editor.chain().setTextAlign("left").run())}
        className={
          isActive("textAlign", { align: "left" })
            ? "text-gray-700"
            : "text-gray-400"
        }
      >
        <AlignLeft />
      </button>
      <button
        onClick={() => apply(() => editor.chain().setTextAlign("center").run())}
        className={
          isActive("textAlign", { align: "center" })
            ? "text-gray-700"
            : "text-gray-400"
        }
      >
        <AlignCenter />
      </button>
      <button
        onClick={() => apply(() => editor.chain().setTextAlign("right").run())}
        className={
          isActive("textAlign", { align: "right" })
            ? "text-gray-700"
            : "text-gray-400"
        }
      >
        <AlignRight />
      </button>
      <button
        onClick={() =>
          apply(() => editor.chain().setTextAlign("justify").run())
        }
        className={
          isActive("textAlign", { align: "justify" })
            ? "text-gray-700"
            : "text-gray-400"
        }
      >
        <AlignJustify />
      </button>
    </div>
  );
};

export default Toolbar;