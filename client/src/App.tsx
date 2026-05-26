import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import Dashboard from './pages/Dashboard'
import AllBooks from './pages/AllBooks'
import AddBook from './pages/AddBook'
import EditBook from './pages/EditBook'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import ProtectedRoute from './routes/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <Router>
      <div className="bg-background">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<ProtectedRoute />}>
            <Route
              index
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="books"
              element={
                <Layout>
                  <AllBooks />
                </Layout>
              }
            />
            <Route
              path="add-book"
              element={
                <Layout>
                  <AddBook />
                </Layout>
              }
            />
            <Route
              path="edit-book/:id"
              element={
                <Layout>
                  <EditBook />
                </Layout>
              }
            />
          </Route>

          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Toaster richColors />
    </Router>
  )
}

export default App
