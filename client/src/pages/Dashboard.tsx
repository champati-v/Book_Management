import { BookOpen, TrendingUp, Grid } from 'lucide-react'
import StatCard from '../components/StatCard'
import DashboardBookCard from '../components/books/DashboardBookCard'
import { useNavigate } from 'react-router-dom'
import DeleteDialog from '../components/DeleteDialog'
import { useEffect, useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import type { Book } from '../types/book'
import { deleteBook, getBooks } from '../api/books'
import { toast } from 'sonner'

export default function Dashboard() {
  const navigate = useNavigate()
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [bookToDelete, setBookToDelete] = useState<string | null>(null)

  const fetchBooks = async () => {
    setLoading(true)
    try {
      const response = await getBooks()
      setBooks(response.books)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to fetch books')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  const recentlyAdded = useMemo(() => books.slice(0, 4), [books])
  const totalGenres = useMemo(() => new Set(books.map((b) => b.genre)).size, [books])

  const confirmDelete = async () => {
    if (!bookToDelete) return
    try {
      await deleteBook(bookToDelete)
      toast.success('Book deleted successfully')
      setDeleteDialogOpen(false)
      setBookToDelete(null)
      await fetchBooks()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete book')
    }
  }

  const bookToDeleteTitle = books.find((b) => b._id === bookToDelete)?.title || ''

  if (loading) {
    return <div className="h-56 rounded-lg bg-muted animate-pulse" />
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Hey There!</h1>
        <p className="text-muted-foreground mt-2">Here's what's happening in your library today.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Total Books"
          value={books.length}
          icon={BookOpen}
          subtitle="Live catalog size"
          accentClassName="bg-blue-100 dark:bg-blue-900/40"
        />
        <StatCard
          title="Recently Added"
          value={recentlyAdded.length}
          icon={TrendingUp}
          subtitle="Latest entries"
          accentClassName="bg-emerald-100 dark:bg-emerald-900/40"
        />
        <div className="hidden lg:block">
          <StatCard
            title="Total Genres"
            value={totalGenres}
            icon={Grid}
            subtitle="Current catalog"
            accentClassName="bg-violet-100 dark:bg-violet-900/40"
          />
        </div>
      </div>
      <div className="block lg:hidden">
      <StatCard
        title="Total Genres"
        value={totalGenres}
        icon={Grid}
        subtitle="Current catalog"
        accentClassName="bg-violet-100 dark:bg-violet-900/40"
      />
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recently Added</CardTitle>
          <Button variant="outline" onClick={() => navigate('/books')}>
            View All
          </Button>
        </CardHeader>
        <CardContent>
          {recentlyAdded.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentlyAdded.map((book) => (
                <DashboardBookCard
                  key={book._id}
                  book={book}
                />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No books added yet.</p>
          )}
        </CardContent>
      </Card>

      <DeleteDialog
        open={deleteDialogOpen}
        title="Delete Book"
        bookTitle={bookToDeleteTitle}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteDialogOpen(false)}
      />
    </div>
  )
}
