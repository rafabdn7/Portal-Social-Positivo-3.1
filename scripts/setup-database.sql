-- Create database (if not exists)
CREATE DATABASE IF NOT EXISTS catalunya_social;
USE catalunya_social;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    avatar_url VARCHAR(255),
    bio TEXT,
    role ENUM('admin', 'moderator', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    parent_id INT,
    icon VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT,
    author_id INT NOT NULL,
    featured_image VARCHAR(255),
    status ENUM('publish', 'draft', 'pending') DEFAULT 'publish',
    comment_status ENUM('open', 'closed') DEFAULT 'open',
    comment_count INT DEFAULT 0,
    view_count INT DEFAULT 0,
    like_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create post_category relationship table
CREATE TABLE IF NOT EXISTS post_category (
    post_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (post_id, category_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    author_id INT NOT NULL,
    parent_id INT,
    content TEXT NOT NULL,
    status ENUM('approved', 'pending', 'spam') DEFAULT 'approved',
    like_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE SET NULL
);

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create post_tag relationship table
CREATE TABLE IF NOT EXISTS post_tag (
    post_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (post_id, tag_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- Insert sample categories
INSERT INTO categories (name, slug, description, icon) VALUES
('Comunidad y Convivencia', 'comunidad', 'Recursos para mejorar la convivencia comunitaria', '🏘️'),
('Discapacidad y Dependencia', 'discapacidad', 'Apoyo para familias con miembros con discapacidad', '🧩'),
('Familias Monoparentales', 'monoparentales', 'Recursos específicos para familias monoparentales', '👩‍👦'),
('Crianza y Primera Infancia', 'crianza', 'Información sobre crianza y desarrollo infantil', '👶'),
('Educación y Apoyo Escolar', 'educacion', 'Recursos educativos y apoyo escolar', '📚'),
('Salud Mental Familiar', 'salud-mental', 'Apoyo para la salud mental en el entorno familiar', '🧠'),
('Vivienda y Alquiler Social', 'vivienda', 'Información sobre vivienda y alquiler social', '🏠'),
('Ayudas Económicas', 'ayudas', 'Información sobre ayudas económicas y subvenciones', '🧾');

-- Insert sample admin user (password: admin123)
INSERT INTO users (username, email, password, display_name, role) VALUES
('admin', 'admin@catalunyasocial.org', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrador', 'admin');

-- Insert sample tags
INSERT INTO tags (name, slug, description) VALUES
('Ayuntamiento', 'ayuntamiento', 'Recursos proporcionados por ayuntamientos'),
('Generalitat', 'generalitat', 'Recursos de la Generalitat de Catalunya'),
('Gratuito', 'gratuito', 'Servicios y recursos gratuitos'),
('Urgente', 'urgente', 'Ayudas de carácter urgente'),
('Familias', 'familias', 'Específico para familias'),
('Infancia', 'infancia', 'Relacionado con infancia'),
('Mayores', 'mayores', 'Para personas mayores'),
('Formación', 'formacion', 'Cursos y formación');

-- Create sample posts and relationships
-- This would be expanded in a real implementation
