import { useState } from "react";
import { FaTag } from "react-icons/fa";
import { IoMdEye, IoMdClose } from "react-icons/io";

const Notas = () => {
  const [showForm, setShowForm] = useState(false);
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      setError("El título es obligatorio");
      return;
    }

    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }

    const newNote = {
      id: Date.now(),
      title,
      description,
      tag,
    };

    setNotes([newNote, ...notes]);

    setTitle("");
    setDescription("");
    setTag("");
    setError("");
    setShowForm(false);
  };

  return (
    <div className="notas-layout">
      {/* ===== ZONA IZQUIERDA ===== */}
      <div className="notas-container">
        <button className="btn-create" onClick={() => setShowForm(!showForm)}>
          + Crear nota
        </button>

        {showForm && (
          <div className="note-card">
            <form onSubmit={handleSubmit}>
              <h3>Nueva Nota</h3>

              {error && <p className="error">{error}</p>}

              <input
                type="text"
                placeholder="Título *"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                list="tags"
                placeholder="Etiqueta"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />

              <datalist id="tags">
                {tags.map((t, index) => (
                  <option key={index} value={t} />
                ))}
              </datalist>

              <button type="submit" className="btn-save">
                Guardar nota
              </button>
            </form>
          </div>
        )}

        {/* LISTA DE NOTAS */}
        <div className="notes-list">
          {notes.map((note) => (
            <div key={note.id} className="note-item">
              <span>{note.title}</span>

              <IoMdEye
                className="eye-icon"
                onClick={() => setSelectedNote(note)}
              />
            </div>
          ))}
        </div>
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

export default Notas;
