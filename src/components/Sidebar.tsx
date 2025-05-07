import { COLORS } from "@/lib/colors";
import { useStore } from "@/store/useStore";
import { Folder as IFolder } from "@/types/type";
import { nanoid } from "nanoid";
import { useState } from "react";
import { PlusIcon } from "lucide-react";
import FolderList from "./FolderList";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const Sidebar = ({ isOpen, onClose }: Props) => {
  const [isCreateFolder, setIsCreateFolder] = useState(false);
  const [folderName, setFolderName] = useState("");
  const { addFolder, folders, selectedFolderId, selectFolder, updateFolder } =
    useStore();

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
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white p-4  transform transition-transform duration-300
        ${isOpen ? "translate-x-0 z-50" : "-translate-x-full"}
        md:static md:translate-x-0 md:opacity-100 md:pointer-events-auto`}
      >
        <button
          onClick={() => {
            selectFolder(null);
            setFolderName("");
            setIsCreateFolder(true);
          }}
          className="border text-amber-400 border-amber-400 hover:text-amber-500 hover:border-amber-500 inline-flex items-center gap-1 px-2 py-1 rounded"
        >
          <PlusIcon size={14} /> add folder
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
                className="bg-gray-200 rounded px-2 py-1"
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

        {/* 🟡 Scrollable folders list */}
        <div
          className="mt-5 flex flex-col  overflow-y-auto max-h-[calc(100vh-200px)] pr-2
            scrollbar-hide"
        >
          {folders.map((folder) => (
            <FolderList
              key={folder.id}
              folder={folder}
              selectedFolderId={selectedFolderId}
              setIsCreateFolder={setIsCreateFolder}
              setFolderName={setFolderName}
              onClose={onClose}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default Sidebar;