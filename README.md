# Book Management Frontend

Book Management System built with React + TypeScript + Tailwind CSS + ShadCN.

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Router
- Axios
- Sonner (toast)

## Features (Brief)

- Login and Register pages
- Cookie-based authentication flow
- Protected routes
- Dashboard with stats and recent books
- All Books page with:
  - Search
  - Genre filter
  - Edit/Delete actions
- Add and Edit book forms
- Responsive UI for different screen sizes

## Demo Login Credentials

- Email: `user@gmail.com`
- Password: `123456`

## Project Structure

```text
src/
  api/                # Axios instance and API modules
  assets/             # Static frontend assets
  components/
    books/            # Book card components
    ui/               # shadcn/ui components
  context/            # Auth context
  pages/              # Route pages (Login, Register, Dashboard, etc.)
  routes/             # Protected route wrapper
  types/              # TypeScript types
```

## Setup (Frontend)

1. Clone Repository:
```bash
git clone https://github.com/champati-v/Book_Management.git
```

2. Install dependencies:
```bash
cd client
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Notes

- Make sure backend API URL - `https://book-management-lkf8.onrender.com/` is configured correctly in `src/api/axios.ts`.
- Auth is cookie-based, so backend CORS must allow credentials.
