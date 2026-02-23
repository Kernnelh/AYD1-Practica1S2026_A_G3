import { useState, useEffect } from "react";
import { FaTag, FaUserFriends } from "react-icons/fa"; // Agregamos un ícono de amigos
import { IoMdEye, IoMdClose } from "react-icons/io";

const Compartidos = () => {
  const [sharedNotes, setSharedNotes] = useState([]); // Notas que recibí
  const [misSharedNotes, setMisSharedNotes] = useState([]); // Notas que yo compartí
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const fetchAllSharedData = async () => {
      try {
        const idUsuario = localStorage.getItem('usuario_id');
        if (!idUsuario) return;

        // 1. Cargar las notas que OTROS compartieron conmigo (Recibidas)
        const resRecibidas = await fetch(`http://localhost:8000/notas/compartidas/${idUsuario}`);
        if (resRecibidas.ok) {
          const dataRecibidas = await resRecibidas.json();
          const notasFormateadas = dataRecibidas.map(n => ({
            id: n.id, title: n.titulo, description: n.descripcion,
            pinned: n.es_fijado, archived: n.es_archivado
          }));
          setSharedNotes(notasFormateadas);
        }

        // 2. Cargar las notas que YO compartí con otros (Enviadas)
        const resEnviadas = await fetch(`http://localhost:8000/notas/mis-compartidas/${idUsuario}`);
        if (resEnviadas.ok) {
          const dataEnviadas = await resEnviadas.json();
          setMisSharedNotes(dataEnviadas);
        }

      } catch (error) {
        console.error("Error al cargar la información de compartidos:", error);
      }
    };
    
    fetchAllSharedData();
  }, []);

  return (
    <div className="shared-layout" style={{ display: "flex", flexDirection: "column", gap: "30px", paddingBottom: "30px" }}>
      
      {/* ===== SECCIÓN 1: NOTAS QUE YO HE COMPARTIDO ===== */}
      <div>
        <h2 style={{ color: "black", marginLeft: "10px", marginBottom: "15px" }}>
          Notas que he compartido
        </h2>
        <div className="notes-list">
          {misSharedNotes.length === 0 ? (
            <p style={{ color: "black", marginLeft: "10px" }}>No has compartido ninguna nota aún.</p>
          ) : (
            misSharedNotes.map((note, index) => (
              <div key={`mis-${index}`} className="note-item" style={{ borderLeft: "5px solid #28a745" }}>
                <span>{note.titulo}</span>
                <div className="note-actions" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {/* Ícono y texto mostrando a quién se la presté */}
                  <FaUserFriends style={{ color: "gray" }} />
                  <span style={{ fontSize: "13px", color: "gray", marginRight: "10px" }}>
                    Compartida con: <strong>{note.compartido_con}</strong>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <hr style={{ border: "0", borderTop: "1px solid #ccc", margin: "0 20px" }} />

      {/* ===== SECCIÓN 2: NOTAS COMPARTIDAS CONMIGO (RECIBIDAS) ===== */}
      <div>
        <h2 style={{ color: "black", marginLeft: "10px", marginBottom: "15px" }}>
          Compartidas conmigo
        </h2>
        <div className="notes-list">
          {sharedNotes.length === 0 ? (
            <p style={{ color: "black", marginLeft: "10px" }}>Nadie ha compartido notas contigo aún.</p>
          ) : (
            sharedNotes.map((note) => (
              <div key={note.id} className="note-item" style={{ borderLeft: "5px solid #007bff" }}>
                <span>{note.title}</span>
                <div className="note-actions">
                  <IoMdEye
                    className="eye-icon"
                    onClick={() => setSelectedNote(note)}
                    style={{ cursor: "pointer", color: "#007bff" }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ===== PANEL DERECHO (Solo lectura para las notas recibidas) ===== */}
      {selectedNote && (
        <div className="note-panel">
          <div className="panel-header">
            <h3>{selectedNote.title}</h3>
            <IoMdClose
              className="close-icon"
              onClick={() => setSelectedNote(null)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="panel-content">
            {selectedNote.description || "Sin descripción"}
          </div>
        </div>
      )}
    </div>
  );
};

export default Compartidos;