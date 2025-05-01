import { useStore } from "@/store/useStore";

const Navbar = () => {
  const { searchQuery, setSearchQuery } = useStore();

  return (
    <div className="p-2 w-full flex gap-8 ">
      <h3 className="text-lg font-semibold text-amber-400">Scribe</h3>
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