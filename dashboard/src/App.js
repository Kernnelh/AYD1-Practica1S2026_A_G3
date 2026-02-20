import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Navbar from "./components/navbar";
import Notas from "./pages/Notas";
import ModificarNotas from "./pages/ModificarNotas";
import "./App.css";
import { IoNotificationsCircle } from "react-icons/io5";

function App() {
  const [showNav, setShowNav] = useState(false);
  const [notes, setNotes] = useState([]);

  return (
    <>
      <header className="app-header">
        {/* Izquierda */}
        <GiHamburgerMenu
          className="hamburger"
          onClick={() => setShowNav(!showNav)}
        />

        {/* Centro */}
        <h1 className="app-title">Notecraft</h1>

        {/* Derecha */}
        <IoNotificationsCircle className="notification-icon" />
      </header>

      <Navbar show={showNav} />

      <div className={`main ${showNav ? "shifted" : ""}`}>
        {/* Rutas */}
        <Routes>
          <Route
            path="/"
            element={<Notas notes={notes} setNotes={setNotes} />}
          />
          <Route
            path="/modify"
            element={<ModificarNotas notes={notes} setNotes={setNotes} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
