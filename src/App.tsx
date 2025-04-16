import "./App.css";
import Editor from "./components/Editor";
import NotesList from "./components/NotesList";

function App() {
  return (
    <div className="w-3/4 h-screen mx-auto p-4 border-2 border-slate-200">
      <div>
        <Editor />
      </div>
      <NotesList />
    </div>
  );
}

export default App;