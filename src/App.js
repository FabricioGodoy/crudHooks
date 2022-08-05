import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Tablero from "./components/tablero";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tablero />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
