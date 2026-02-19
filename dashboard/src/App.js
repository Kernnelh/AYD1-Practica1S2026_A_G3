import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Navbar from "./components/navbar";
import Notas from "./pages/Notas";
import "./App.css";
import { IoNotificationsCircle } from "react-icons/io5";

function App() {
  const [showNav, setShowNav] = useState(false);

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
        <Routes>
          <Route path="/" element={<Notas />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
