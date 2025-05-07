import { Folder, Trash, Pencil, EllipsisVertical } from "lucide-react";
import { useStore } from "@/store/useStore";
import { IFolderList } from "@/types/type";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { toast } from "react-toastify";

const FolderList = ({
  folder,
  selectedFolderId,
  setIsCreateFolder,
  setFolderName,
  onClose,
}: IFolderList) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const { selectFolder, folders, deleteFolder } = useStore();

  const handleUpdateFolder = (id: string) => {
    setIsCreateFolder(true);
    selectFolder(id);
    const folderToUpdate = folders.find((folder) => folder.id === id);
    if (folderToUpdate) {
      setFolderName(folderToUpdate.name);
    }
  };

  const handleDeleteFolder = (id: string) => {
    deleteFolder(id);
    selectFolder("all");
    toast("Folder deleted successfully!");
  };
  return (
    <div
      key={folder.id}
      className={`flex items-center justify-between cursor-pointer p-2 rounded ${
        selectedFolderId === folder.id ? "bg-amber-100 " : "hover:bg-gray-100"
      }`}
      onClick={() => {
        selectFolder(folder.id);
        onClose();
      }}
    >
      <div className="flex gap-2 items-center">
        <Folder style={{ color: folder.color }} size={18} />
        <span>{folder.name}</span>
      </div>

      {folder.id !== "all" && (
        <Popover open={showOptions} onOpenChange={setShowOptions}>
          <PopoverTrigger onClick={(e) => e.stopPropagation()}>
            <EllipsisVertical size={18} color="#9ca3af" />{" "}
          </PopoverTrigger>
          <PopoverContent className="w-max">
            <div className="flex justify-end flex-col items-end gap-3">
              <button
                className="inline-flex w-full p-1 justify-end text-gray-500 items-center gap-2 hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowOptions(false);
                  handleUpdateFolder(folder.id);
                }}
              >
                <span>Edit</span> <Pencil className="text-gray-400" size={16} />{" "}
              </button>
              <button
                className="inline-flex w-full p-1 justify-end text-gray-500 items-center gap-2 hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteFolder(folder.id);
                }}
              >
                Delete <Trash className="text-gray-400" size={16} />
              </button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default FolderList;