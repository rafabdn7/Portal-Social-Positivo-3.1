#!/bin/bash

# Colors for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored messages
print_message() {
  echo -e "${2}${1}${NC}"
}

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Print welcome message
print_message "
█▀▀ █▀█ ▀█▀ █▀█ █   █ █ █▄ █ █▄█ █▀█   █▀ █▀█ █▀▀ █ █▀█ █  
█▄▄ █▀█  █  █▀█ █▄▄ █▄█ █ ▀█  █  █▀█   ▄█ █▄█ █▄▄ █ █▀█ █▄▄

█▀█ █▀█ █▀ █ ▀█▀ █ █ █▀█
█▀▀ █▄█ ▄█ █  █  █ █ █▀█

Auto-Installer v1.0
" $BLUE

print_message "Este script instalará la plataforma Catalunya Social Positiva." $GREEN
print_message "Verificando requisitos del sistema..." $YELLOW

# Check for required software
print_message "Verificando Node.js..." $YELLOW
if ! command_exists node; then
  print_message "Node.js no está instalado. Por favor, instale Node.js 18 o superior." $RED
  exit 1
else
  NODE_VERSION=$(node -v)
  print_message "Node.js ${NODE_VERSION} está instalado." $GREEN
fi

print_message "Verificando npm..." $YELLOW
if ! command_exists npm; then
  print_message "npm no está instalado. Por favor, instale npm." $RED
  exit 1
else
  NPM_VERSION=$(npm -v)
  print_message "npm ${NPM_VERSION} está instalado." $GREEN
fi

print_message "Verificando Git..." $YELLOW
if ! command_exists git; then
  print_message "Git no está instalado. Por favor, instale Git." $RED
  exit 1
else
  GIT_VERSION=$(git --version)
  print_message "Git ${GIT_VERSION} está instalado." $GREEN
fi

# Check for MySQL
print_message "Verificando MySQL..." $YELLOW
if ! command_exists mysql; then
  print_message "MySQL no está instalado. Se instalará automáticamente." $YELLOW
  
  # Install MySQL based on the OS
  if command_exists apt-get; then
    print_message "Instalando MySQL con apt..." $YELLOW
    sudo apt-get update
    sudo apt-get install -y mysql-server
  elif command_exists yum; then
    print_message "Instalando MySQL con yum..." $YELLOW
    sudo yum install -y mysql-server
    sudo systemctl start mysqld
    sudo systemctl enable mysqld
  else
    print_message "No se pudo instalar MySQL automáticamente. Por favor, instálelo manualmente." $RED
    exit 1
  fi
else
  print_message "MySQL está instalado." $GREEN
fi

# Create project directory
print_message "Creando directorio del proyecto..." $YELLOW
mkdir -p catalunya-social-positiva
cd catalunya-social-positiva

# Initialize Next.js project
print_message "Inicializando proyecto Next.js..." $YELLOW
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git

# Install additional dependencies
print_message "Instalando dependencias adicionales..." $YELLOW
npm install framer-motion lucide-react next-themes @radix-ui/react-avatar @radix-ui/react-dropdown-menu @radix-ui/react-slot @radix-ui/react-toast @radix-ui/react-label @radix-ui/react-radio-group @radix-ui/react-tabs @radix-ui/react-progress @radix-ui/react-tooltip @tanstack/react-table class-variance-authority clsx tailwind-merge

# Create WordPress connection
print_message "Configurando conexión con WordPress..." $YELLOW
mkdir -p lib
cat > lib/wordpress.ts << 'EOL'
// This file handles the WordPress API integration

type Post = {
  id: number
  slug: string
  title: string
  excerpt: string
  featuredImage?: string
  author: {
    name: string
    avatar?: string
  }
  commentCount: number
  likeCount: number
  date: string
  categories: string[]
}

// WordPress REST API endpoint
const API_URL = process.env.WORDPRESS_API_URL || 'https://your-wordpress-site.com/wp-json/wp/v2'

// Fetch posts from WordPress
export async function getPosts(count = 10): Promise<Post[]> {
  try {
    // In a real implementation, you would fetch from the WordPress REST API
    // const response = await fetch(`${API_URL}/posts?_embed&per_page=${count}`)
    // const data = await response.json()
    
    // For demo purposes, returning mock data
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      slug: `post-${i + 1}`,
      title: `Ayuda para familias en ${['Barcelona', 'Girona', 'Tarragona', 'Lleida'][i % 4]}`,
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.',
      featuredImage: `/placeholder.svg?height=400&width=600&text=Post+${i + 1}`,
      author: {
        name: `Autor ${i + 1}`,
        avatar: `/placeholder.svg?height=40&width=40&text=A${i + 1}`
      },
      commentCount: Math.floor(Math.random() * 50),
      likeCount: Math.floor(Math.random() * 100),
      date: new Date().toISOString(),
      categories: [['Comunidad', 'Vivienda', 'Educación', 'Salud'][i % 4]]
    }))
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

// Get a single post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    // In a real implementation, you would fetch from the WordPress REST API
    // const response = await fetch(`${API_URL}/posts?slug=${slug}&_embed`)
    // const data = await response.json()
    
    // For demo purposes, returning mock data
    return {
      id: 1,
      slug,
      title: `Detalles sobre ${slug.replace(/-/g, ' ')}`,
      excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.',
      featuredImage: `/placeholder.svg?height=600&width=1200&text=${slug}`,
      author: {
        name: 'Autor del Post',
        avatar: '/placeholder.svg?height=40&width=40&text=A'
      },
      commentCount: Math.floor(Math.random() * 50),
      likeCount: Math.floor(Math.random() * 100),
      date: new Date().toISOString(),
      categories: ['Comunidad', 'Ayudas']
    }
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

// Get categories from WordPress
export async function getCategories() {
  try {
    // In a real implementation, you would fetch from the WordPress REST API
    // const response = await fetch(`${API_URL}/categories`)
    // const data = await response.json()
    
    // For demo purposes, returning mock data
    return [
      { id: 1, name: 'Comunidad y Convivencia', slug: 'comunidad' },
      { id: 2, name: 'Discapacidad y Dependencia', slug: 'discapacidad' },
      { id: 3, name: 'Familias Monoparentales', slug: 'monoparentales' },
      { id: 4, name: 'Crianza y Primera Infancia', slug: 'crianza' },
      { id: 5, name: 'Educación y Apoyo Escolar', slug: 'educacion' },
      { id: 6, name: 'Salud Mental Familiar', slug: 'salud-mental' },
      { id: 7, name: 'Vivienda y Alquiler Social', slug: 'vivienda' },
      { id: 8, name: 'Ayudas Económicas', slug: 'ayudas' }
    ]
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}
EOL

# Create .env file
print_message "Creando configuración de entorno..." $YELLOW
cat > .env.local << 'EOL'
# WordPress API
WORDPRESS_API_URL=https://your-wordpress-site.com/wp-json/wp/v2

# Authentication
JWT_SECRET=your-secret-key-here

# Site configuration
NEXT_PUBLIC_SITE_NAME=Catalunya Social Positiva
NEXT_PUBLIC_SITE_URL=https://catalunyasocial.org
EOL

# Create database setup script
print_message "Creando script de configuración de base de datos..." $YELLOW
mkdir -p scripts
cat > scripts/setup-database.sql << 'EOL'
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
EOL

# Setup WordPress if requested
print_message "¿Desea instalar WordPress como CMS headless? (s/n)" $YELLOW
read install_wordpress

if [[ $install_wordpress == "s" || $install_wordpress == "S" ]]; then
  print_message "Instalando WordPress..." $YELLOW
  
  # Create WordPress directory
  mkdir -p wordpress
  cd wordpress
  
  # Download WordPress
  wget https://wordpress.org/latest.zip
  unzip latest.zip
  mv wordpress/* .
  rm -rf wordpress latest.zip
  
  # Create wp-config.php
  cp wp-config-sample.php wp-config.php
  
  # Generate random keys
  KEYS=$(curl -s https://api.wordpress.org/secret-key/1.1/salt/)
  
  # Replace database settings and keys
  sed -i "s/database_name_here/catalunya_social/g" wp-config.php
  sed -i "s/username_here/root/g" wp-config.php
  sed -i "s/password_here//g" wp-config.php
  sed -i "s/localhost/localhost/g" wp-config.php
  sed -i "s/wp_/csp_/g" wp-config.php
  
  # Add keys
  sed -i "/define( 'AUTH_KEY'/,/define( 'NONCE_SALT'/c\\$KEYS" wp-config.php
  
  # Enable REST API
  echo "
// Enable REST API
define('JWT_AUTH_SECRET_KEY', '$(openssl rand -base64 32)');
define('JWT_AUTH_CORS_ENABLE', true);
" >> wp-config.php
  
  print_message "WordPress instalado en el directorio 'wordpress'." $GREEN
  print_message "Por favor, complete la instalación visitando la URL de su sitio WordPress." $YELLOW
  
  cd ..
fi

# Run database setup
print_message "¿Desea configurar la base de datos ahora? (s/n)" $YELLOW
read setup_db

if [[ $setup_db == "s" || $setup_db == "S" ]]; then
  print_message "Configurando base de datos..." $YELLOW
  
  # Ask for MySQL credentials
  print_message "Ingrese el usuario de MySQL (por defecto: root):" $YELLOW
  read mysql_user
  mysql_user=${mysql_user:-root}
  
  print_message "Ingrese la contraseña de MySQL (deje en blanco si no tiene):" $YELLOW
  read -s mysql_password
  
  # Run the SQL script
  if [[ -z $mysql_password ]]; then
    mysql -u $mysql_user < scripts/setup-database.sql
  else
    mysql -u $mysql_user -p$mysql_password < scripts/setup-database.sql
  fi
  
  print_message "Base de datos configurada correctamente." $GREEN
fi

print_message "¡Instalación completa! 🎉" $GREEN
print_message "Para iniciar el servidor de desarrollo, ejecute:" $BLUE
print_message "cd catalunya-social-positiva && npm run dev" $YELLOW

print_message "
Próximos pasos:
1. Configure su WordPress como CMS headless
2. Actualice la URL de la API de WordPress en .env.local
3. Personalice los componentes en el directorio components
4. Añada más páginas y funcionalidades según sea necesario
" $BLUE

print_message "¡Gracias por elegir Catalunya Social Positiva!" $GREEN
