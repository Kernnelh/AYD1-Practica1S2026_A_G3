import { useState } from "react";
import { FaTag } from "react-icons/fa";
import { IoMdEye, IoMdClose } from "react-icons/io";

const Fijados = () => {
  const [pinnedNotes, setPinnedNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  // Ejemplo inicial: luego se conectará al backend
  const demoPinned = [
    { id: 1, title: "Nota fijada 1", description: "Descripción de prueba", tag: "Importante" },
    { id: 2, title: "Nota fijada 2", description: "Otra descripción", tag: "Urgente" }
  ];

  // Cargar notas de prueba al inicio
  useState(() => {
    setPinnedNotes(demoPinned);
  }, []);

  return (
    <div className="pinned-layout">
      {/* ===== TÍTULO ===== */}
      <h2 style={{ color: "black", marginLeft: "10px", marginBottom: "15px" }}>
        Notas Fijadas
      </h2>

      {/* ===== LISTA DE NOTAS FIJADAS ===== */}
      <div className="notes-list">
        {pinnedNotes.length === 0 ? (
          <p>No hay notas fijadas.</p>
        ) : (
          pinnedNotes.map((note) => (
            <div key={note.id} className="note-item">
              <span>{note.title}</span>

              {/* Botón para ver detalles */}
              <IoMdEye
                className="eye-icon"
                onClick={() => setSelectedNote(note)}
              />
            </div>
          ))
        )}
      </div>

      {/* ===== PANEL DERECHO ===== */}
      {selectedNote && (
        <div className="note-panel">
          <div className="panel-header">
            <h3>{selectedNote.title}</h3>
            <IoMdClose
              className="close-icon"
              onClick={() => setSelectedNote(null)}
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

export default Fijados;