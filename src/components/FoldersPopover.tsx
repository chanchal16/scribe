import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Folder, FolderInput } from "lucide-react";
import { useStore } from "@/store/useStore";
import { searchFolders } from "@/lib/searchFolders";
import { Folder as IFolder, Note } from "@/types/type";
import { toast } from 'react-toastify';

const FoldersPopover = ({ note }: { note: Note }) => {
  const {
    folders,
    selectedFolderId,
    moveNoteToFolder,
    setOpenDialog,
    setExpandedNoteId,
  } = useStore();
  const [searchFolderQuery, setSearchFolderQuery] = useState<string>("");
  const [showFoldersPopover, setShowFoldersPopover] = useState<boolean>(false);

  const filteredFolders = searchFolders(
    folders,
    searchFolderQuery.toLowerCase()
  );

  const handleMoveNote = (noteId: string, folder: IFolder) => {
    moveNoteToFolder(noteId, folder.id);
    setSearchFolderQuery("");
    setOpenDialog(false);
    setExpandedNoteId(null);
    setShowFoldersPopover(false);
    toast(`Folder moved to ${folder.name}`)
  };

  return (
    <DropdownMenu
      open={showFoldersPopover}
      onOpenChange={setShowFoldersPopover}
    >
      <DropdownMenuTrigger asChild>
        <button
          onClick={(e) => e.stopPropagation()}
          className="border-none p-2 hover:bg-[#5f636826] hover:rounded-full"
        >
          <FolderInput size={18} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 md:w-80 max-h-60 overflow-auto flex flex-col gap-2">
        <input
          type="text"
          className="outline-none border border-gray-300 p-1"
          placeholder="search folder"
          value={searchFolderQuery}
          onChange={(e) => setSearchFolderQuery(e.target.value)}
        />
        {filteredFolders.map((folder) => (
          <div
            key={folder.id}
            onClick={() => handleMoveNote(note.id, folder)}
            className={`flex gap-2 p-1 items-center hover:bg-gray-100 cursor-pointer ${
              selectedFolderId === folder.id ? "bg-gray-100" : "bg-transparent"
            }`}
          >
            <Folder style={{ color: folder.color }} size={18} />
            <span>{folder.name}</span>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FoldersPopover;