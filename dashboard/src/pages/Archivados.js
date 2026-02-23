import { useState } from "react";
import { FaTag } from "react-icons/fa";
import { IoMdEye, IoMdClose } from "react-icons/io";
import { GoArchive } from "react-icons/go";

const Archivados = ({ notes = [], setNotes, setArchivedNotes }) => {
  const [selectedNote, setSelectedNote] = useState(null);

  const handleUnarchive = (note) => {
    setArchivedNotes(notes.filter((n) => n.id !== note.id));        // quitar de archivadas
    setNotes((prev) => [note, ...prev]);                            // devolver a notas normales
  };

  return (
    <div className="archived-layout">
      <h2 style={{ color: "black", marginLeft: "15px", marginBottom: "15px" }}>
        Notas Archivadas
      </h2>

      {/* LISTA DE NOTAS ARCHIVADAS */}
      <div className="notes-list">
        {notes.length === 0 ? (
          <p style={{ color: "black" }}>No hay notas archivadas</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="note-item">
              <span>{note.title}</span>
              <div className="note-actions">
                <IoMdEye
                className="eye-icon"
                onClick={() => setSelectedNote(note)}
                />
                <GoArchive
                className="archive-icon"
                onClick={() => handleUnarchive(note)}
                />
            </div>
            </div>




          ))
        )}
      </div>

      {/* PANEL DERECHO */}
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

export default Archivados;

// FUNCIONANDO HASTA EL MOMENTO