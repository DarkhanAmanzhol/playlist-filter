import "./App.css";
import Home from "./pages/Home";
import PlaylistContextProvider from "./contexts/PlaylistContext";

function App() {
  return (
    <PlaylistContextProvider>
      <Home />
    </PlaylistContextProvider>
  );
}

export default App;
