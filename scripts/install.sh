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

print_message "This script will set up your Catalunya Social Positiva platform." $GREEN
print_message "Checking system requirements..." $YELLOW

# Check for required software
print_message "Checking for Node.js..." $YELLOW
if ! command_exists node; then
  print_message "Node.js is not installed. Please install Node.js 18 or higher." $RED
  exit 1
else
  NODE_VERSION=$(node -v)
  print_message "Node.js ${NODE_VERSION} is installed." $GREEN
fi

print_message "Checking for npm..." $YELLOW
if ! command_exists npm; then
  print_message "npm is not installed. Please install npm." $RED
  exit 1
else
  NPM_VERSION=$(npm -v)
  print_message "npm ${NPM_VERSION} is installed." $GREEN
fi

print_message "Checking for Git..." $YELLOW
if ! command_exists git; then
  print_message "Git is not installed. Please install Git." $RED
  exit 1
else
  GIT_VERSION=$(git --version)
  print_message "Git ${GIT_VERSION} is installed." $GREEN
fi

# Create project directory
print_message "Creating project directory..." $YELLOW
mkdir -p catalunya-social-positiva
cd catalunya-social-positiva

# Initialize Next.js project
print_message "Initializing Next.js project..." $YELLOW
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git

# Install additional dependencies
print_message "Installing additional dependencies..." $YELLOW
npm install framer-motion lucide-react next-themes @radix-ui/react-avatar @radix-ui/react-dropdown-menu @radix-ui/react-slot @radix-ui/react-toast @radix-ui/react-label @radix-ui/react-radio-group class-variance-authority clsx tailwind-merge

# Create WordPress connection
print_message "Setting up WordPress connection..." $YELLOW
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
print_message "Creating environment configuration..." $YELLOW
cat > .env.local << 'EOL'
# WordPress API
WORDPRESS_API_URL=https://your-wordpress-site.com/wp-json/wp/v2

# Authentication
JWT_SECRET=your-secret-key-here

# Site configuration
NEXT_PUBLIC_SITE_NAME=Catalunya Social Positiva
NEXT_PUBLIC_SITE_URL=https://catalunyasocial.org
EOL

print_message "Installation complete! 🎉" $GREEN
print_message "To start your development server, run:" $BLUE
print_message "cd catalunya-social-positiva && npm run dev" $YELLOW

print_message "
Next steps:
1. Configure your WordPress headless CMS
2. Update the WORDPRESS_API_URL in .env.local
3. Customize the components in the components directory
4. Add more pages and features as needed
" $BLUE

print_message "Thank you for choosing Catalunya Social Positiva!" $GREEN
