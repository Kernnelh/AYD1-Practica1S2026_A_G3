import { useState, useEffect } from "react";
import { FaTag } from "react-icons/fa";
import { IoMdEye, IoMdClose } from "react-icons/io";

const Compartidos = () => {
  const [sharedNotes, setSharedNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  // 1. Cargar las notas que OTROS compartieron conmigo
  useEffect(() => {
    const fetchSharedNotas = async () => {
      try {
        const idUsuario = localStorage.getItem('usuario_id');
        if (!idUsuario) return;

        // Llamamos al nuevo endpoint usando nuestro ID
        const respuesta = await fetch(`http://localhost:8000/notas/compartidas/${idUsuario}`);
        if (respuesta.ok) {
          const data = await respuesta.json();
          // Formateamos los datos para que coincidan con la vista
          const notasFormateadas = data.map(n => ({
            id: n.id,
            title: n.titulo,
            description: n.descripcion,
            pinned: n.es_fijado,
            archived: n.es_archivado
          }));
          
          setSharedNotes(notasFormateadas);
        }
      } catch (error) {
        console.error("Error al cargar notas compartidas:", error);
      }
    };
    fetchSharedNotas();
  }, []);

  return (
    <div className="shared-layout">
      {/* ===== TÍTULO ===== */}
      <h2 style={{ color: "black", marginLeft: "10px", marginBottom: "15px" }}>
        Notas Compartidas Conmigo
      </h2>

      {/* ===== LISTA DE NOTAS COMPARTIDAS ===== */}
      <div className="notes-list">
        {sharedNotes.length === 0 ? (
          <p style={{ color: "black", marginLeft: "10px" }}>Nadie ha compartido notas contigo aún.</p>
        ) : (
          sharedNotes.map((note) => (
            <div key={note.id} className="note-item">
              <span>{note.title}</span>

              {/* Botón para ver detalles (Solo lectura) */}
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

      {/* ===== PANEL DERECHO ===== */}
      {selectedNote && (
        <div className="note-panel">
          <div className="panel-header">
            <h3>{selectedNote.title} <span style={{fontSize: '0.6em', color: 'gray'}}>(Compartida)</span></h3>
            <IoMdClose
              className="close-icon"
              onClick={() => setSelectedNote(null)}
              style={{ cursor: "pointer" }}
            />
          </div>

          <div className="panel-content">
            {selectedNote.description || "Sin descripción"}
          </div>

          {selectedNote.tag && (
            <div className="panel-tag">
              <FaTag />
              <span>{selectedNote.tag}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Compartidos;