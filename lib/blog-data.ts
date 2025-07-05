export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readTime: string;
  featured: boolean;
}

// Sample blog data - in a real app, this would come from a database
const blogs: Blog[] = [
  {
    id: 'getting-started-with-nextjs-14',
    title: 'Getting Started with Next.js 14: A Complete Guide',
    excerpt: 'Learn how to build modern web applications with Next.js 14, exploring the latest features including app router, server components, and streaming.',
    content: `# Getting Started with Next.js 14: A Complete Guide

Next.js 14 represents a significant milestone in the evolution of React-based web development. This latest version introduces groundbreaking features that make building fast, scalable web applications easier than ever before.

## What's New in Next.js 14?

### App Router (Stable)
The App Router is now stable and provides a more intuitive way to structure your applications. It leverages React Server Components by default, offering better performance and developer experience.

\`\`\`javascript
// app/page.tsx
export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Next.js 14</h1>
      <p>Building the future of web development</p>
    </div>
  );
}
\`\`\`

### Server Actions
Server Actions allow you to run server-side code directly from your components, eliminating the need for API routes in many cases.

\`\`\`javascript
async function createPost(formData: FormData) {
  'use server';
  
  const title = formData.get('title');
  // Save to database
}
\`\`\`

## Performance Improvements

Next.js 14 includes significant performance improvements:

- **Faster Local Development**: 53% faster local server startup
- **Improved Memory Usage**: 22% less memory usage
- **Better Tree Shaking**: Smaller bundle sizes

## Getting Started

To create a new Next.js 14 project:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Best Practices

1. **Use Server Components by Default**: They're faster and more efficient
2. **Leverage the App Router**: Better file organization and routing
3. **Implement Streaming**: Progressive page loading for better UX
4. **Optimize Images**: Use the built-in Image component

## Conclusion

Next.js 14 sets a new standard for web development frameworks. With its focus on performance, developer experience, and modern React patterns, it's the perfect choice for your next project.

Start building with Next.js 14 today and experience the future of web development!`,
    date: 'December 15, 2024',
    category: 'Next.js',
    readTime: '8 min read',
    featured: true
  },
  {
    id: 'mastering-typescript-advanced-patterns',
    title: 'Mastering TypeScript: Advanced Patterns for Better Code',
    excerpt: 'Dive deep into advanced TypeScript patterns including conditional types, mapped types, and template literal types to write more robust applications.',
    content: `# Mastering TypeScript: Advanced Patterns for Better Code

TypeScript has evolved far beyond a simple type checker. Modern TypeScript offers powerful type-level programming capabilities that can help you write more robust, maintainable code.

## Conditional Types

Conditional types allow you to create types that depend on a condition:

\`\`\`typescript
type ApiResponse<T> = T extends string 
  ? { message: T } 
  : { data: T };

type StringResponse = ApiResponse<string>; // { message: string }
type UserResponse = ApiResponse<User>; // { data: User }
\`\`\`

## Mapped Types

Transform existing types by mapping over their properties:

\`\`\`typescript
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};
\`\`\`

## Template Literal Types

Create string types with specific patterns:

\`\`\`typescript
type EventName<T extends string> = \`on\${Capitalize<T>}\`;

type ClickHandler = EventName<'click'>; // 'onClick'
type HoverHandler = EventName<'hover'>; // 'onHover'
\`\`\`

## Utility Types in Practice

Combine utility types for powerful transformations:

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

type PublicUser = Omit<User, 'password'>;
type UserUpdate = Partial<Pick<User, 'name' | 'email'>>;
\`\`\`

## Best Practices

1. **Start Simple**: Begin with basic types and gradually add complexity
2. **Use Utility Types**: Leverage built-in utilities before creating custom ones
3. **Type Guards**: Implement proper runtime type checking
4. **Generic Constraints**: Use constraints to make generics more specific

## Conclusion

Advanced TypeScript patterns enable you to catch more errors at compile time and create more expressive APIs. Master these patterns to take your TypeScript skills to the next level.`,
    date: 'December 10, 2024',
    category: 'TypeScript',
    readTime: '12 min read',
    featured: true
  },
  {
    id: 'building-scalable-react-applications',
    title: 'Building Scalable React Applications: Architecture Patterns',
    excerpt: 'Learn proven architectural patterns for building large-scale React applications that are maintainable, testable, and performant.',
    content: `# Building Scalable React Applications: Architecture Patterns

As React applications grow in complexity, having a solid architectural foundation becomes crucial. This guide explores proven patterns for building scalable React applications.

## Component Architecture

### Atomic Design Principles

Structure your components using atomic design:

- **Atoms**: Basic building blocks (Button, Input)
- **Molecules**: Simple component combinations
- **Organisms**: Complex UI sections
- **Templates**: Page-level layouts
- **Pages**: Specific instances of templates

\`\`\`typescript
// Atom
const Button = ({ children, onClick }: ButtonProps) => (
  <button onClick={onClick}>{children}</button>
);

// Molecule
const SearchBox = () => (
  <div>
    <Input placeholder="Search..." />
    <Button>Search</Button>
  </div>
);
\`\`\`

## State Management Patterns

### Context + Reducer Pattern

For complex state logic, combine Context with useReducer:

\`\`\`typescript
interface AppState {
  user: User | null;
  theme: 'light' | 'dark';
  notifications: Notification[];
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    default:
      return state;
  }
}
\`\`\`

## Performance Optimization

### Code Splitting

Split your code at the route level:

\`\`\`typescript
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Suspense>
  );
}
\`\`\`

### Memoization Strategies

Use React.memo and useMemo strategically:

\`\`\`typescript
const ExpensiveComponent = React.memo(({ data }: Props) => {
  const processedData = useMemo(() => 
    expensiveDataProcessing(data), [data]
  );
  
  return <div>{processedData}</div>;
});
\`\`\`

## Testing Strategies

### Component Testing

Test components in isolation:

\`\`\`typescript
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renders button with correct text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button')).toHaveTextContent('Click me');
});
\`\`\`

## Project Structure

Organize your project for scalability:

\`\`\`
src/
  components/
    ui/          # Reusable UI components
    forms/       # Form-specific components
    layout/      # Layout components
  hooks/         # Custom hooks
  utils/         # Utility functions
  types/         # TypeScript types
  contexts/      # React contexts
  pages/         # Page components
\`\`\`

## Conclusion

Building scalable React applications requires thoughtful architecture from the start. By following these patterns and best practices, you'll create applications that can grow with your needs while maintaining code quality and developer productivity.`,
    date: 'December 5, 2024',
    category: 'React',
    readTime: '15 min read',
    featured: true
  },
  {
    id: 'docker-development-workflow',
    title: 'Streamlining Development with Docker: A Complete Workflow',
    excerpt: 'Learn how to create efficient development workflows using Docker containers, from local development to production deployment.',
    content: `# Streamlining Development with Docker: A Complete Workflow

Docker has revolutionized how we develop, test, and deploy applications. This guide shows you how to create an efficient development workflow using Docker containers.

## Why Docker for Development?

Docker solves the "it works on my machine" problem by ensuring consistent environments across development, testing, and production.

### Benefits:
- **Consistency**: Same environment everywhere
- **Isolation**: No dependency conflicts
- **Portability**: Works on any Docker-enabled system
- **Scalability**: Easy to scale services

## Setting Up Your Development Environment

### Basic Dockerfile

\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
\`\`\`

### Docker Compose for Multi-Service Apps

\`\`\`yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - database

  database:
    image: postgres:15
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
\`\`\`

## Development Best Practices

### Multi-Stage Builds

Optimize your images with multi-stage builds:

\`\`\`dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
CMD ["npm", "start"]
\`\`\`

### Development vs Production Configs

Use different Docker Compose files:

\`\`\`yaml
# docker-compose.dev.yml
version: '3.8'
services:
  app:
    build:
      context: .
      target: development
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
\`\`\`

## Docker Commands Cheat Sheet

Essential commands for daily development:

\`\`\`bash
# Build and run
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f app

# Execute commands in container
docker-compose exec app npm install

# Stop all services
docker-compose down

# Clean up everything
docker system prune -a
\`\`\`

## Debugging in Docker

### Debugging Node.js Applications

\`\`\`dockerfile
# Add debugging support
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000 9229
CMD ["node", "--inspect=0.0.0.0:9229", "index.js"]
\`\`\`

## Production Deployment

### Health Checks

Add health checks to your containers:

\`\`\`dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1
\`\`\`

### Security Best Practices

1. **Use non-root users**
2. **Scan images for vulnerabilities**
3. **Keep base images updated**
4. **Use secrets management**

## Conclusion

Docker transforms development workflows by providing consistency, isolation, and portability. Start with simple containers and gradually adopt more advanced patterns as your needs grow.

The investment in learning Docker pays dividends in reduced debugging time, easier onboarding, and reliable deployments.`,
    date: 'November 28, 2024',
    category: 'Docker',
    readTime: '10 min read',
    featured: false
  },
  {
    id: 'modern-css-techniques-2024',
    title: 'Modern CSS Techniques Every Developer Should Know in 2024',
    excerpt: 'Explore cutting-edge CSS features like container queries, cascade layers, and modern layout techniques that are changing web design.',
    content: `# Modern CSS Techniques Every Developer Should Know in 2024

CSS continues to evolve rapidly, introducing powerful new features that make styling more intuitive and maintainable. Let's explore the latest techniques every developer should master.

## Container Queries

Container queries allow you to style elements based on their container's size, not just the viewport:

\`\`\`css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: auto 1fr;
  }
}
\`\`\`

## Cascade Layers

Organize your CSS with cascade layers for better specificity management:

\`\`\`css
@layer reset, base, components, utilities;

@layer components {
  .button {
    background: blue;
    color: white;
  }
}

@layer utilities {
  .text-center {
    text-align: center;
  }
}
\`\`\`

## Modern Layout with Subgrid

Subgrid allows nested grids to participate in their parent's grid:

\`\`\`css
.main-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.card {
  display: grid;
  grid-row: span 2;
  grid-template-rows: subgrid;
}
\`\`\`

## CSS Nesting

Write more organized CSS with native nesting:

\`\`\`css
.card {
  background: white;
  border-radius: 8px;
  
  & .title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  & .content {
    padding: 1rem;
    
    & p {
      margin-bottom: 1rem;
    }
  }
  
  &:hover {
    transform: translateY(-2px);
  }
}
\`\`\`

## Custom Properties with \`@property\`

Define custom properties with types and default values:

\`\`\`css
@property --gradient-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.gradient-button {
  background: linear-gradient(var(--gradient-angle), blue, purple);
  transition: --gradient-angle 0.3s ease;
}

.gradient-button:hover {
  --gradient-angle: 90deg;
}
\`\`\`

## Logical Properties

Use logical properties for better internationalization:

\`\`\`css
.element {
  margin-inline: 1rem; /* left and right in LTR, right and left in RTL */
  margin-block: 2rem;  /* top and bottom */
  padding-inline-start: 1rem; /* left in LTR, right in RTL */
}
\`\`\`

## Advanced Selectors

Leverage new pseudo-selectors for better targeting:

\`\`\`css
/* Style elements that have specific children */
.parent:has(.child) {
  background: lightblue;
}

/* Select every 3rd element starting from the 2nd */
.item:nth-child(3n+2) {
  color: red;
}

/* Select elements within a range */
.item:nth-child(n+3):nth-child(-n+7) {
  font-weight: bold;
}
\`\`\`

## Color Functions

Use modern color functions for better color manipulation:

\`\`\`css
:root {
  --primary: oklch(0.7 0.15 200);
  --primary-light: oklch(from var(--primary) calc(l + 0.1) c h);
  --primary-dark: oklch(from var(--primary) calc(l - 0.1) c h);
}

.button {
  background: var(--primary);
  border: 1px solid var(--primary-dark);
}

.button:hover {
  background: var(--primary-light);
}
\`\`\`

## View Transitions API

Create smooth page transitions with the View Transitions API:

\`\`\`css
@view-transition {
  navigation: auto;
}

::view-transition-old(root) {
  animation: fade-out 0.3s ease-out;
}

::view-transition-new(root) {
  animation: fade-in 0.3s ease-in;
}

@keyframes fade-out {
  to { opacity: 0; }
}

@keyframes fade-in {
  from { opacity: 0; }
}
\`\`\`

## Performance Optimization

### Content Visibility

Improve rendering performance with content-visibility:

\`\`\`css
.long-content {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px;
}
\`\`\`

### CSS Containment

Use containment to improve performance:

\`\`\`css
.widget {
  contain: layout style paint;
}
\`\`\`

## Browser Support Strategy

When using modern CSS features:

1. **Check browser support** on caniuse.com
2. **Use progressive enhancement**
3. **Provide fallbacks** for critical features
4. **Use feature queries** with \`@supports\`

\`\`\`css
/* Fallback */
.grid {
  display: flex;
  flex-wrap: wrap;
}

/* Enhanced with grid */
@supports (display: grid) {
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}
\`\`\`

## Conclusion

Modern CSS offers powerful tools for creating better user experiences with cleaner, more maintainable code. Start incorporating these techniques into your projects and stay ahead of the curve in web development.

The key is to adopt these features gradually, ensuring backward compatibility while leveraging the power of modern CSS.`,
    date: 'November 20, 2024',
    category: 'Web Development',
    readTime: '11 min read',
    featured: false
  }
];

export function getAllBlogs(): Blog[] {
  return blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedBlogs(): Blog[] {
  return blogs.filter(blog => blog.featured);
}

export function getBlogById(id: string): Blog | undefined {
  return blogs.find(blog => blog.id === id);
}

export function getBlogsByCategory(category: string): Blog[] {
  return blogs.filter(blog => blog.category === category);
}