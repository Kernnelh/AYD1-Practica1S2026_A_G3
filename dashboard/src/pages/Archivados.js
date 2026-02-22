import { useState } from "react";
import { FaTag } from "react-icons/fa";
import { IoMdEye, IoMdClose } from "react-icons/io";

const Archivados = () => {
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  // Simulación inicial: luego se conectará al backend Flask
  const demoNotes = [
    { id: 1, title: "Nota archivada 1", description: "Ejemplo de descripción", tag: "Trabajo" },
    { id: 2, title: "Nota archivada 2", description: "Otra descripción", tag: "Personal" }
  ];

  // Cargar notas de prueba al inicio
  useState(() => {
    setArchivedNotes(demoNotes);
  }, []);

  return (
    <div className="archived-layout">
    <h2 style={{ color: "black", marginLeft: "15px", marginBottom: "15px" }}>Notas Archivadas</h2>


      {/* LISTA DE NOTAS ARCHIVADAS */}
      <div className="notes-list">
        {archivedNotes.map((note) => (
          <div key={note.id} className="note-item">
            <span>{note.title}</span>
            <IoMdEye
              className="eye-icon"
              onClick={() => setSelectedNote(note)}
            />
          </div>
        ))}
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
