import { Folder, Trash, Pencil } from "lucide-react";
import { useStore } from "@/store/useStore";
import { IFolderList } from "@/types/type";

const FolderList = ({
  folder,
  selectedFolderId,
  setIsCreateFolder,
  setFolderName,
}: IFolderList) => {
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
  };
  return (
    <div
      key={folder.id}
      className={`flex items-center justify-between cursor-pointer p-2 mt-5 rounded ${
        selectedFolderId === folder.id
          ? "bg-gray-50 shadow"
          : "hover:bg-gray-100"
      }`}
      onClick={() => selectFolder(folder.id)}
    >
      <div className="flex gap-2 items-center">
        <Folder style={{ color: folder.color }} size={18} />
        <span>{folder.name}</span>
      </div>

      {folder.id !== "all" && (
        <div className="flex gap-3">
          <button onClick={() => handleUpdateFolder(folder.id)}>
            <Pencil className="text-gray-400" size={16} />{" "}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteFolder(folder.id);
            }}
          >
            <Trash className="text-gray-400" size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default FolderList;