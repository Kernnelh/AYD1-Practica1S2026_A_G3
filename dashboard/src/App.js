import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Navbar from "./components/navbar";
import Notas from "./pages/Notas";
import "./App.css";
import { IoNotificationsCircle } from "react-icons/io5";

import Archivados from "./pages/Archivados";   
import Fijados from "./pages/Fijados"; 
import Compartidos from "./pages/Compartidos";

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
          <Route path="/archived" element={<Archivados />} />   // direccion localhost archivados
          <Route path="/set" element={<Fijados />} />           // direccion localhost fijados    
          <Route path="/shared" element={<Compartidos />} />
             

        </Routes>
      </div>
    </>
  );
}

export default App;
