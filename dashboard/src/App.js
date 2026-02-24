import { useState, useEffect } from "react"; // <-- CORRECCIÓN 1
import { Routes, Route } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import Navbar from "./components/navbar";
import { FaShareAlt } from "react-icons/fa";

import "./App.css";
import { IoNotificationsCircle } from "react-icons/io5";

import Notas from "./pages/Notas";
import Archivados from "./pages/Archivados";   
import Fijados from "./pages/Fijados"; 
import Compartidos from "./pages/Compartidos";
import ModificarNotas from "./pages/ModificarNotas";

// Páginas de tu compañero
import Registro from './pages/Registro';
import Perfil from './pages/Perfil';
import InicioSesion from './pages/InicioSesion';
import { UserProvider } from './UserContext';






function App() {
  const [showNav, setShowNav] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false); // <-- CORRECCIÓN 2
  const [notificaciones, setNotificaciones] = useState([]);

  // Cada vez que se abra la campanita, disparamos el fetch al backend
  useEffect(() => {
    const fetchNotificaciones = async () => {
      const idUsuario = localStorage.getItem('usuario_id');
      if (!idUsuario) return;

      try {
        const respuesta = await fetch(`http://localhost:8000/notas/notificaciones/${idUsuario}`);
        if (respuesta.ok) {
          const data = await respuesta.json();
          setNotificaciones(data);
        }
      } catch (error) {
        console.error("Error al cargar notificaciones:", error);
      }
    };

    if (showNotifications) {
      fetchNotificaciones();
    }
  }, [showNotifications]); // Se ejecuta cuando showNotifications cambia a true

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
        {/* Menú de notificaciones */}
        {showNotifications && (
          <div className="notification-menu" style={{ position: 'absolute', right: '20px', top: '60px', backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '5px', width: '300px', zIndex: 1000, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <h4 style={{ margin: '0', padding: '10px', backgroundColor: '#002b5e', color: 'white', borderRadius: '5px 5px 0 0' }}>Notificaciones</h4>
            <ul style={{ listStyle: 'none', padding: '0', margin: '0', maxHeight: '300px', overflowY: 'auto' }}>
              
              {notificaciones.length === 0 ? (
                <li style={{ padding: "15px", color: "gray", fontSize: "14px", textAlign: "center" }}>
                  No tienes notificaciones
                </li>
              ) : (
                notificaciones.map((notif, index) => (
                  <li key={index} style={{ padding: "12px", borderBottom: "1px solid #eee", display: "flex", alignItems: "center", gap: "15px" }}>
                    {/* El ícono que pide el enunciado */}
                    <FaShareAlt style={{ color: "#007bff", fontSize: "20px" }} /> 
                    <div style={{ color: "black" }}>
                      {/* El nombre de usuario del propietario */}
                      <p style={{ margin: 0, fontSize: "14px" }}><strong>{notif.propietario}</strong> te compartió:</p>
                      <p style={{ margin: 0, fontSize: "13px", color: "#555" }}>{notif.titulo}</p>
                    </div>
                  </li>
                ))
              )}

            </ul>
          </div>
        )}
      </header>

      <Navbar show={showNav} />
      
      <UserProvider>
      <div className={`main ${showNav ? "shifted" : ""}`}>
        <Routes>
          {/* El login ahora es la página de inicio ("/") */}
          <Route path="/" element={<InicioSesion />} />

          {/* Las notas ahora se muestran en "/notas" (a donde manda el login tras el éxito) */}
          <Route 
            path="/notas" 
            element={<Notas notes={notes} setNotes={setNotes} archivedNotes={archivedNotes} setArchivedNotes={setArchivedNotes} />} 
          />
          
          <Route path="/archived" element={<Archivados notes={archivedNotes} setNotes={setNotes} setArchivedNotes={setArchivedNotes} />} />
          <Route path="/set" element={<Fijados />} />          
          <Route path="/shared" element={<Compartidos />} />
          <Route path="/modify" element={<ModificarNotas notes={notes} setNotes={setNotes} />} />
          
          {/* Rutas de tu compañero */}
          <Route path="/registro" element={<Registro />} />
          <Route path="/profile" element={<Perfil />} />
          {/* Eliminé la ruta vieja de /login porque ya la pusimos en "/" */}
        </Routes>
      </div>
      </UserProvider>
    </>
  );
}

export default App;

// Funcionando correctamente


// CAMBIOS