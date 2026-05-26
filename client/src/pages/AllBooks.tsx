import { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import CompactBookCard from '../components/books/CompactBookCard'
import DeleteDialog from '../components/DeleteDialog'
import { Input } from '../components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { Button } from '../components/ui/button'
import type { Book } from '../types/book'
import { deleteBook, getBooks } from '../api/books'
import { toast } from 'sonner'

const ITEMS_PER_PAGE = 8
let booksCache: Book[] | null = null

export default function AllBooks() {
  const navigate = useNavigate()
  const location = useLocation()
  const shouldRefresh = Boolean((location.state as { refresh?: boolean } | null)?.refresh)
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [bookToDelete, setBookToDelete] = useState<string | null>(null)

  const fetchBooks = async () => {
    setLoading(true)
    try {
      const response = await getBooks({
        search: searchQuery || undefined,
        genre: selectedGenre === 'all' ? undefined : selectedGenre,
      })
      setBooks(response.books)
      if (!searchQuery && selectedGenre === 'all') {
        booksCache = response.books
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to fetch books')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!shouldRefresh && !searchQuery && selectedGenre === 'all' && booksCache) {
      setBooks(booksCache)
      setLoading(false)
      return
    }

    const timeout = setTimeout(() => {
      fetchBooks()
    }, 300)

    return () => clearTimeout(timeout)
  }, [searchQuery, selectedGenre])

  const genres = useMemo(() => [...new Set((booksCache ?? books).map((book) => book.genre))], [books])

  const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedBooks = books.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleDelete = (id: string) => {
    setBookToDelete(id)
    setDeleteDialogOpen(true)
  }

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">All Books</h1>
        <p className="text-muted-foreground mt-2">Manage your complete library inventory.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by title, author, or genre..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-10"
          />
        </div>

        <Select
          value={selectedGenre}
          onValueChange={(value) => {
            if (!value) return
            setSelectedGenre(value)
            setCurrentPage(1)
          }}
        >
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="All Genres" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            {genres.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button className="cursor-pointer" onClick={() => navigate('/add-book')}>+ Add New Book</Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="h-64 rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      ) : paginatedBooks.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {paginatedBooks.map((book) => (
              <CompactBookCard
                key={book._id}
                book={book}
                onDelete={handleDelete}
                onEdit={(id) => navigate(`/edit-book/${id}`)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              <Button variant="outline" className="min-w-10" disabled>
                {currentPage} / {totalPages}
              </Button>

              <Button
                variant="outline"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No books found matching your criteria.</p>
          <Button
            onClick={() => {
              setSearchQuery('')
              setSelectedGenre('all')
              setCurrentPage(1)
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

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

