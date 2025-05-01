import { Store } from "@/types/type";

export const searchNotes = (
  notes: Store["notes"],
  searchQuery: Store["searchQuery"]
) => {
  return notes?.filter((note) => {
    if (searchQuery === "") {
      return note;
    } else {
      return (
        note.title.toLowerCase().includes(searchQuery) ||
        note.content.toLowerCase().includes(searchQuery)
      );
    }
  });
};