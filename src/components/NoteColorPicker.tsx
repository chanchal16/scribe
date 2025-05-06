import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { noteColors } from "@/lib/colors";
import { Note } from "@/types/type";
import { Palette } from "lucide-react";
import { useState } from "react";

const NoteColorPicker = ({
  note,
  onChangeColor,
}: {
  note?: Note;
  onChangeColor: (color: string) => void;
}) => {
  const [showPopover, setShowPopover] = useState<boolean>(false);
  return (
    <Popover open={showPopover} onOpenChange={setShowPopover}>
      <PopoverTrigger asChild>
        <button className="p-2 hover:bg-[#5f636826] hover:rounded-full">
          <Palette size={18} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto flex flex-wrap gap-2 p-2">
        {noteColors?.map((color: string) => (
          <button
            key={color}
            onClick={() => onChangeColor(color)}
            className={`w-6 h-6 rounded-full border ${
              note?.color === color ? "border-black" : "border-transparent"
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default NoteColorPicker;