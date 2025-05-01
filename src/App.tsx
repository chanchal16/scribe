import "./App.css";
import Editor from "./components/Editor";
import Navbar from "./components/Navbar";
import NotesList from "./components/NotesList";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="w-full h-screen relative px-8">
      <Navbar />
      <div className=" flex h-[90%]  ">
        <Sidebar />
        <div>
          <NotesList />
          <Editor />
        </div>
      </div>
    </div>
  );
}

export default App;