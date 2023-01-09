import "./App.css";
import Home from "./pages/home";
import { Route, Routes } from "react-router-dom";
import PlaylistContextProvider from "./contexts/PlaylistContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient} contextSharing>
      <PlaylistContextProvider>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </PlaylistContextProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
