CREATE DATABASE IF NOT EXISTS notecraft;
USE notecraft;


# USUARIOS
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
);

# NOTAS
CREATE TABLE notas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT,
    es_fijado BOOLEAN DEFAULT FALSE,
    es_archivado BOOLEAN DEFAULT FALSE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    editado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_notas_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
);

# ETIQUETAS
CREATE TABLE etiquetas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    
    CONSTRAINT fk_etiquetas_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
);

# NOTAS_ETIQUETAS
CREATE TABLE notas_etiquetas (
    id_nota INT NOT NULL,
    id_etiqueta INT NOT NULL,
    
    PRIMARY KEY (id_nota, id_etiqueta),
    
    CONSTRAINT fk_notas_etiquetas_notas
        FOREIGN KEY (id_nota)
        REFERENCES notas(id)
        ON DELETE CASCADE,
        
    CONSTRAINT fk_notas_etiquetas_etiquetas
        FOREIGN KEY (id_etiqueta)
        REFERENCES etiquetas(id)
        ON DELETE CASCADE
);

# NOTAS_COMPARTIDAS
CREATE TABLE notas_compartidas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_nota INT NOT NULL,
    id_usuario INT NOT NULL,
    id_usuario_compartido INT NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_notas_compartidas_usuario
        FOREIGN KEY (id_nota)
        REFERENCES notas(id)
        ON DELETE CASCADE,
        
    CONSTRAINT fk_notas_usuario_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id)
        ON DELETE CASCADE,
        
    CONSTRAINT fk_notas_recibido
        FOREIGN KEY (id_usuario_compartido)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
);


# NOTIFICACIONES
CREATE TABLE notificaciones(
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    mensaje VARCHAR(255) NOT NULL,
    es_leido BOOLEAN DEFAULT FALSE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_notificaciones_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
);

#AMIGOS
CREATE TABLE amigos (
    id_usuario INT NOT NULL,
    id_usuario_amigo INT NOT NULL,
    
    PRIMARY KEY (id_usuario, id_usuario_amigo),

    CONSTRAINT fk_amigo_usuario
        FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_amigo_amigo
        FOREIGN KEY (id_usuario_amigo)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
);

# ÍNDICES

CREATE INDEX idx_notas_usuario ON notas(id_usuario);
CREATE INDEX idx_etiquetas_usuario ON etiquetas(id_usuario);
CREATE INDEX idx_notificaciones_usuario ON notificaciones(id_usuario);