USE notecraft;
#DATOS DE EJEMPLO, PUEDEN UTILIZAR, AGREGAR ELIMINAR SI GUSTAN.
# USUARIOS
INSERT INTO usuarios (usuario, password) VALUES
('juan', '123456'),
('maria', '123456'),
('carlos', '123456'),
('ana', '123456'),
('luis', '123456');

# NOTAS
INSERT INTO notas (id_usuario, titulo, descripcion, es_fijado, es_archivado) VALUES
(1, 'Comprar supermercado', 'Comprar leche y pan', FALSE, FALSE),
(1, 'Proyecto universidad', 'Terminar modelo ER', TRUE, FALSE),
(2, 'Rutina ejercicio', 'Correr 5km', FALSE, FALSE),
(2, 'Leer libro', 'Leer 20 paginas', FALSE, TRUE),
(3, 'Reunión trabajo', 'Reunion a las 3pm', TRUE, FALSE),
(3, 'Estudiar MySQL', 'Practicar joins', FALSE, FALSE),
(4, 'Viaje', 'Planificar vacaciones', FALSE, FALSE),
(4, 'Ideas app', 'Aplicación de notas', FALSE, FALSE),
(5, 'Lista tareas', 'Lavar ropa', FALSE, TRUE),
(5, 'Examen', 'Estudiar backend', TRUE, FALSE);

# ETIQUETAS
INSERT INTO etiquetas (id_usuario, nombre) VALUES
(1, 'Personal'),
(1, 'Universidad'),
(2, 'Salud'),
(3, 'Trabajo'),
(4, 'Ideas'),
(5, 'Estudio');

# NOTAS_ETIQUETAS
INSERT INTO notas_etiquetas (id_nota, id_etiqueta) VALUES
(1, 1),
(2, 2),
(3, 3),
(5, 4),
(8, 5),
(10, 6);

# AMIGOS
INSERT INTO amigos (id_usuario, id_usuario_amigo) VALUES
(1,2),(2,1),
(1,3),(3,1),
(2,4),(4,2),
(3,5),(5,3);

# NOTAS_COMPARTIDAS
INSERT INTO notas_compartidas (id_nota, id_usuario, id_usuario_compartido) VALUES
(2, 1, 2),
(5, 3, 1),
(10, 5, 3);

# NOTIFICACIONES
INSERT INTO notificaciones (id_usuario, mensaje) VALUES
(2, 'Juan te compartió una nota'),
(1, 'Carlos te compartió una nota'),
(3, 'Luis te compartió una nota');
