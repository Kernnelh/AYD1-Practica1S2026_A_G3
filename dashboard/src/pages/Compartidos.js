import { useState } from "react";
import { FaTag } from "react-icons/fa";
import { IoMdEye, IoMdClose } from "react-icons/io";

const Compartidos = () => {
  const [sharedNotes, setSharedNotes] = useState([
    // Datos de ejemplo: luego se reemplazan con los reales
    { id: 1, title: "Nota compartida 1", description: "Ejemplo de descripción", tag: "Trabajo", owner: "Juan", sharedWith: ["Ana", "Luis"] },
    { id: 2, title: "Nota compartida 2", description: "Otra descripción", tag: "Personal", owner: "María", sharedWith: ["Pedro"] }
  ]);
  const [selectedNote, setSelectedNote] = useState(null);

  return (
    <div className="shared-layout">
      {/* ===== TÍTULO ===== */}
      <h2 style={{ color: "black", marginLeft: "20px", marginBottom: "10px" }}>
        Notas Compartidas
      </h2>

      {/* ===== LISTA DE NOTAS COMPARTIDAS ===== */}
      <div className="notes-list">
        {sharedNotes.length === 0 ? (
          <p>No tienes notas compartidas.</p>
        ) : (
          sharedNotes.map((note) => (
            <div key={note.id} className="note-item">
              <span>
                {note.title}{" "}
                <small style={{ color: "gray" }}>
                  (Propietario: {note.owner})
                </small>
              </span>

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

          {/* Información de compartido */}
          <div className="panel-shared">
            <p>
              <strong>Propietario:</strong> {selectedNote.owner}
            </p>
            {selectedNote.sharedWith && (
              <p>
                <strong>Compartido con:</strong>{" "}
                {selectedNote.sharedWith.join(", ")}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Compartidos;