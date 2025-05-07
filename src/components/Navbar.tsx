import { Menu } from "lucide-react";
import { useStore } from "@/store/useStore";

type Props = {
  onToggleSidebar: () => void;
};

const Navbar = ({ onToggleSidebar }: Props) => {
  const { searchQuery, setSearchQuery } = useStore();

  return (
    <div className="p-2 w-full flex items-center gap-4">
      {/* Hamburger */}
      <button
        onClick={onToggleSidebar}
        className="md:hidden p-2 rounded hover:bg-gray-100"
      >
        <Menu size={24} />
      </button>

      {/* Logo */}
      <h3 className="text-2xl font-kalam font-bold text-amber-400">Scribe</h3>

      {/* Search */}
      <input
        type="text"
        placeholder="search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-4/6 p-1 rounded-lg border border-gray-200 mx-auto outline-none"
      />
    </div>
  );
};
export default Navbar;