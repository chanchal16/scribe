import { COLORS } from "@/lib/colors";
import { useStore } from "@/store/useStore";
import { Folder as IFolder } from "@/types/type";
import { nanoid } from "nanoid";
import { useState } from "react";
import FolderList from "./FolderList";

const Sidebar = () => {
  const [isCreateFolder, setIsCreateFolder] = useState(false);
  const [folderName, setFolderName] = useState("");
  const {
    addFolder,
    folders,
    selectedFolderId,
    selectFolder,
    updateFolder,
  } = useStore();

  const handleCreateFolder = () => {
    if (!selectedFolderId) {
      const folderObj: IFolder = {
        id: nanoid(),
        name: folderName,
        color: COLORS[folders.length % COLORS.length],
      };
      addFolder(folderObj);
    } else {
      const selectedFolder = folders.find((f) => f.id === selectedFolderId);
      if (selectedFolder) {
        const updatedFolder: IFolder = {
          ...selectedFolder,
          name: folderName,
        };
        updateFolder(updatedFolder);
      }
      selectFolder(null);
    }
    setFolderName("");
    setIsCreateFolder(false);
  };

  return (
    <div className="w-64  p-4">
      <button
        onClick={() => {
          selectFolder(null);
          setFolderName("");
          setIsCreateFolder(true);
        }}
        className="border border-amber-400 px-2 py-1 rounded"
      >
        add folder
      </button>
      {isCreateFolder && (
        <div className="flex flex-col gap-4 mt-2">
          <input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            className="p-2 outline-none w-full rounded border border-blue-500"
          />
          <div className="flex w-full gap-4">
            <button
              className="bg-gray-200 rounded px-2 py-1 "
              onClick={() => setIsCreateFolder(false)}
            >
              cancel
            </button>
            <button
              onClick={handleCreateFolder}
              className="bg-blue-400 text-white px-2 py-1 rounded"
            >
              {selectedFolderId === "all" || selectedFolderId
                ? "update"
                : "create"}
            </button>
          </div>
        </div>
      )}

      <div>
        {folders.map((folder) => (
          <FolderList
            key={folder.id}
            folder={folder}
            selectedFolderId={selectedFolderId}
            setIsCreateFolder={setIsCreateFolder}
            setFolderName={setFolderName}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;