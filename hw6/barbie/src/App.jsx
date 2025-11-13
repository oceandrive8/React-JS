import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./components/rootlayout";
import Home from "./pages/home";
import About from "./pages/about";
import MovieList from "./components/movielist";
import MovieDetail from "./pages/moviedetail";
import Login from "./pages/login";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="items" element={<MovieList />} />
          <Route path="items/:id" element={<MovieDetail />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

