import { Store } from "@/types/type";

export const searchFolders = (
  folders: Store["folders"],
  searchQuery: Store["searchQuery"]
) => {
  return folders?.filter((folder) => {
    if (searchQuery === "") {
      return folder;
    } else {
      return folder.name.toLowerCase().includes(searchQuery);
    }
  });
};