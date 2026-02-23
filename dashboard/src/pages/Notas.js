import { useState, useEffect } from "react";
import { FaTag, FaThumbtack } from "react-icons/fa";
import { IoMdEye, IoMdClose } from "react-icons/io";
import { GoArchive } from "react-icons/go";

const Notas = () => {
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  
  const [showForm, setShowForm] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  
  // Estados para CREAR nota
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");

  // NUEVO: Estados para EDITAR nota
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Cargar notas desde el backend
  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const idUsuario = localStorage.getItem('usuario_id');
        if (!idUsuario) return;

        const respuesta = await fetch(`http://localhost:8000/notas/?usuario_id=${idUsuario}`);
        if (respuesta.ok) {
          const data = await respuesta.json();
          const notasFormateadas = data.map(n => ({
            id: n.id,
            title: n.titulo,
            description: n.descripcion,
            pinned: n.es_fijado,
            archived: n.es_archivado
          }));
          setNotes(notasFormateadas.filter(n => !n.archived));
        }
      } catch (error) {
        console.error("Error al cargar notas:", error);
      }
    };
    fetchNotas();
  }, []);

  // Seleccionar nota para ver/editar en el panel derecho
  const handleSelectNote = (note) => {
    setSelectedNote(note);
    setEditTitle(note.title);
    setEditDescription(note.description || "");
  };

  const handleArchive = (note) => {
    setNotes(notes.filter((n) => n.id !== note.id));
    setArchivedNotes([note, ...archivedNotes]);
  };

  const togglePin = (noteId) => {                       
    setNotes(notes.map((n) => n.id === noteId ? { ...n, pinned: !n.pinned } : n));
  };

  // Guardar NUEVA nota
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      setError("El título es obligatorio");
      return;
    }

    const idUsuario = localStorage.getItem('usuario_id') || 1;
    const nuevaNotaBD = {
      id_usuario: parseInt(idUsuario),
      titulo: title,
      descripcion: description,
      es_fijado: false,
      es_archivado: false
    };

    try {
      const respuesta = await fetch('http://localhost:8000/notas/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaNotaBD)
      });

      if (respuesta.ok) {
        const notaGuardada = await respuesta.json();
        const nuevaNotaFront = {
          id: notaGuardada.id,
          title: notaGuardada.titulo,
          description: notaGuardada.descripcion,
          pinned: notaGuardada.es_fijado
        };
        
        setNotes([nuevaNotaFront, ...notes]);
        setTitle("");
        setDescription("");
        setTag("");
        setError("");
        setShowForm(false);
      }
    } catch (error) {
      setError("Error al guardar en la base de datos");
    }
  };

  // NUEVO: Guardar nota MODIFICADA (PUT)
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await fetch(`http://localhost:8000/notas/${selectedNote.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: editTitle,
          descripcion: editDescription
        })
      });

      if (respuesta.ok) {
        // Actualizamos la lista local de notas para que se refleje el cambio instantáneamente
        setNotes(notes.map(n => 
          n.id === selectedNote.id 
            ? { ...n, title: editTitle, description: editDescription } 
            : n
        ));
        // Cerramos el panel derecho
        setSelectedNote(null);
      } else {
        console.error("Error al modificar la nota");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
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
              {error && <p className="error" style={{color: 'red'}}>{error}</p>}
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
              <button type="submit" className="btn-save">
                Guardar nota
              </button>
            </form>
          </div>
        )}

        {/* LISTA DE NOTAS */}
        <div className="notes-list">
          {notes.length === 0 ? (
            <p style={{ color: "black" }}>No hay notas creadas</p>
          ) : (
            [...notes] 
              .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)) 
              .map((note) => (
                <div key={note.id} className="note-item">
                  <span>{note.title}</span>
                  <div className="note-actions">
                    <IoMdEye className="eye-icon" onClick={() => handleSelectNote(note)} />
                    <GoArchive className="archive-icon" onClick={() => handleArchive(note)} />
                    <FaThumbtack
                      className={`pin-icon ${note.pinned ? "pinned" : ""}`}
                      onClick={() => togglePin(note.id)}
                    />
                  </div>
                </div>
              ))
          )}
        </div>
      </div>

      {/* ===== PANEL DERECHO (AHORA ES FORMULARIO DE EDICIÓN) ===== */}
      {selectedNote && (
        <div className="note-panel">
          <div className="panel-header">
            <h3>Editar Nota</h3>
            <IoMdClose className="close-icon" onClick={() => setSelectedNote(null)} />
          </div>
          
          <form onSubmit={handleUpdate} className="edit-form" style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px'}}>
            <input 
              type="text" 
              value={editTitle} 
              onChange={(e) => setEditTitle(e.target.value)} 
              required
              style={{padding: '8px', borderRadius: '5px', border: '1px solid #ccc'}}
            />
            <textarea 
              value={editDescription} 
              onChange={(e) => setEditDescription(e.target.value)} 
              rows="5"
              style={{padding: '8px', borderRadius: '5px', border: '1px solid #ccc', resize: 'vertical'}}
            />
            <button type="submit" className="btn-save" style={{marginTop: '10px'}}>
              Guardar Cambios
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Notas;
// funciona por el  momento