import "./App.css";
import Editor from "./components/Editor";
import NotesList from "./components/NotesList";

function App() {
  return (
    <div className="w-3/4 h-screen relative mx-auto p-4">
      <NotesList />
      <Editor />
    </div>
  );
}

export default App;