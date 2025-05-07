import { useState } from "react";
import "./App.css";
import Editor from "./components/Editor";
import Navbar from "./components/Navbar";
import NotesList from "./components/NotesList";
import Sidebar from "./components/Sidebar";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  return (
    <div className="w-full h-screen relative md:px-4 font-kalam">
      <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className=" flex h-[90%]  ">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="w-full">
          <NotesList />
          <Editor />
        </div>
      </div>
    </div>
  );
}

export default App;