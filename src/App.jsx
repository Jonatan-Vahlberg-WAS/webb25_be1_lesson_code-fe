import "./App.css";
import { useState } from "react";
import CreateSongForm from "./components/songs/CreateSongForm";
import SongList from "./components/songs/SongList";
import RegisterForm from "./components/auth/RegisterForm";
import LoginForm from "./components/auth/LoginForm";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [accessToken, setAccessToken] = useState(null);

  return (
    <main className="app-main">
      {accessToken && <p>Inloggad. Token: {accessToken}</p>}
      <RegisterForm />
      <LoginForm onToken={setAccessToken} />
      <CreateSongForm onCreated={() => setRefreshKey((k) => k + 1)} />
      <SongList key={refreshKey} />
    </main>
  );
}

export default App;
