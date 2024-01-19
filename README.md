# Drag & Drop Taskboard

Drag & Drop Taskboard is a dynamic task management application using a Kanban board layout, developed with React.js and Redux Toolkit. It features a responsive design with Tailwind CSS and Vite, and uses Supabase for data storage. Key functionalities include adding, editing, and deleting tasks and columns, along with drag-and-drop capabilities provided by react-beautiful-dnd for easy organization.

👉 [PROJECT DEMO](https://taskboard-eta.vercel.app/)

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### Used Technologies

- React.js
- Redux & Redux Toolkit
- Tailwind CSS
- Vite
- Supabase
- react-beautiful-dnd

### App Properties

- Add tasks to columns
- Edit tasks' description
- Delete task
- Add new columns to board
- Edit columns title (double click)
- Delete column
- Move and sort tasks between columns
- Move and sort columns in the board

Every action made is recorded in the Supabase so that the data is not lost.
