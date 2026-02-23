import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Navbar from "./components/navbar";

import "./App.css";
import { IoNotificationsCircle } from "react-icons/io5";

import Notas from "./pages/Notas";
import Archivados from "./pages/Archivados";   
import Fijados from "./pages/Fijados"; 
import Compartidos from "./pages/Compartidos";

function App() {
  const [showNav, setShowNav] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const [notes, setNotes] = useState([]);                     // para mostrar siempre las notas normales
  const [archivedNotes, setArchivedNotes] = useState([]);     // para mostrar siempre las notas archivadas


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
        <IoNotificationsCircle 
          className="notification-icon" 
          onClick={() => setShowNotifications(!showNotifications)} 
        />

        {/* Menú de notificaciones */}
        {showNotifications && (
          <div className="notification-menu">
            <h4>Notificaciones</h4>
            <ul>
            </ul>
          </div>
        )}
      </header>

      <Navbar show={showNav} />
      
      <div className={`main ${showNav ? "shifted" : ""}`}>
        <Routes>

          <Route path="/" element={<Notas notes={notes} setNotes={setNotes} archivedNotes={archivedNotes} setArchivedNotes={setArchivedNotes} />} />
          <Route path="/archived" element={<Archivados notes={archivedNotes} setNotes={setNotes} setArchivedNotes={setArchivedNotes} />} />
          
          <Route path="/set" element={<Fijados />} />           
          <Route path="/shared" element={<Compartidos />} />
          </Routes>
      </div>
    </>
  );
}

export default App;

// Funcionando correctamente