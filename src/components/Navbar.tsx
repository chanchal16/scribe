import { Menu } from "lucide-react";
import { useStore } from "@/store/useStore";

type Props = {
  onToggleSidebar: () => void;
};

const Navbar = ({ onToggleSidebar }: Props) => {
  const { searchQuery, setSearchQuery } = useStore();

  return (
    <div className=" py-3 border-b w-full flex items-center gap-4">
      <button
        onClick={onToggleSidebar}
        className="md:hidden p-2 rounded text-gray-500 hover:bg-gray-100"
      >
        <Menu size={20} />
      </button>
      <h3 className="text-2xl font-kalam font-bold text-amber-400">Scribe</h3>
      <input
        type="text"
        placeholder="search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-4/6 px-2 py-1.5 text-base rounded-lg border border-gray-200 mx-auto outline-none"
      />
    </div>
  );
};
export default Navbar;