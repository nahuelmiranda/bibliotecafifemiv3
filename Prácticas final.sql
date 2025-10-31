SQL — DDL y ejemplo de datos

-- Crear base de datos (ejemplo)
CREATE DATABASE bibliotecafifemi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE bibliotecafifemi;

-- Tabla categorias
CREATE TABLE categoria (
  categoria_id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL
);

-- Tabla libros
CREATE TABLE libro (
  libro_id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  autor VARCHAR(200),
  anio INT,
  isbn VARCHAR(20),
  disponible BOOLEAN DEFAULT TRUE,
  categoria_id INT,
  FOREIGN KEY (categoria_id) REFERENCES categoria(categoria_id) ON DELETE SET NULL
);

-- Tabla contactos (para el formulario)
CREATE TABLE contacto (
  contacto_id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  mensaje TEXT NOT NULL,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Datos de ejemplo
INSERT INTO categoria (nombre) VALUES ('Ficción'), ('No Ficción'), ('Ciencia'), ('Historia');

INSERT INTO libro (titulo, autor, anio, isbn, disponible, categoria_id) VALUES
('Viaje a la Luna', 'A. Autor', 2019, 'ISBN123', TRUE, 1),
('Introducción a IA', 'B. Autor', 2022, 'ISBN456', TRUE, 3),
('Principito', 'C. Autor' ,  1943, 'ISBN', TRUE,),
('Maze runner', 'D. Autor' , 2009, 'ISBN',TRUE, ),
('1984','E. Autor , 1949, 'ISBN',TRUE, ),
('Cien años de soledad', 'F. Autor', 1967, 'ISBN',TRUE, ),
('Don quijote de la mancha', 'G. Autor', 1605, 'ISBN' ,TRUE ),
('Harry Potter y la piedra filosofal' , 'H. Autor', 1997, 'ISBN' ,TRUE ); 

---
