import { useState, useEffect } from "react";

const NoteForm = ({
  initialData = null,
  onSubmit,
  buttonText = "Guardar",
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [error, setError] = useState("");

  // Cargar datos cuando se edita una nota
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setTag(initialData.tag || "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      setError("El título es obligatorio");
      return;
    }

    onSubmit({
      title,
      description,
      tag,
    });

    setError("");
  };

  return (
    <div className="note-card">
      <form onSubmit={handleSubmit}>
        <h3>{initialData ? "Modificar Nota" : "Nueva Nota"}</h3>

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
          type="text"
          placeholder="Etiqueta"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />

        <button type="submit" className="btn-save">
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default NoteForm;