import "./App.css";
import { useState } from "react";
import CreateSongForm from "./components/songs/CreateSongForm";
import SongList from "./components/songs/SongList";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <main className="app-main">
      <CreateSongForm onCreated={() => setRefreshKey((k) => k + 1)} />
      <SongList key={refreshKey} />
    </main>
  );
}

export default App
