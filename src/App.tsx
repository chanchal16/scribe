import "./App.css";
import Editor from "./components/Editor";

function App() {
  const note = {
    id: "001",
    folderId: "123",
    title: "first note",
    content: "this is sample note", // stored as Tiptap JSON
    updatedAt: 2,
  };

  return (
    <div className="w-3/4 h-screen mx-auto p-4 bg-slate-200">
      <Editor note={note} />
    </div>
  );
}

export default App;
