import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { BookFormData } from '../types/book'
import BookForm from '../components/BookForm'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { toast } from 'sonner'
import { getBookById, updateBook } from '../api/books'
import { Button } from '../components/ui/button'
import { X } from 'lucide-react'

export default function EditBook() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [initialData, setInitialData] = useState<BookFormData | null>(null)

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return
      try {
        const response = await getBookById(id)
        setInitialData({
          title: response.book.title,
          author: response.book.author,
          genre: response.book.genre,
          publishedYear: response.book.publishedYear,
          coverImageUrl: response.book.coverImageUrl,
        })
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to fetch book details')
      } finally {
        setIsPageLoading(false)
      }
    }

    fetchBook()
  }, [id])

  const handleSubmit = async (data: BookFormData) => {
    if (!id) return
    setIsLoading(true)
    try {
      await updateBook(id, { ...data, publishedYear: Number(data.publishedYear) })
      toast.success('Book updated successfully!')
      navigate('/books', { state: { refresh: true } })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update book')
    } finally {
      setIsLoading(false)
    }
  }

  if (isPageLoading) {
    return <div className="h-48 rounded-lg bg-muted animate-pulse" />
  }

  if (!initialData) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-foreground mb-2">Book not found</h1>
          <p className="text-muted-foreground mb-6">The book you're looking for doesn't exist.</p>
          <Button variant="link" onClick={() => navigate('/books')}>
            Go back to all books
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/40 backdrop-blur-md"
        onClick={() => navigate('/books', { replace: true })}
      />
      <Card className="relative w-full max-w-2xl border-white/20 bg-background/75 supports-backdrop-filter:backdrop-blur-xl shadow-2xl">
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle>Edit Book</CardTitle>
            <p className="text-muted-foreground mt-2 text-sm">Update the book information below.</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/books', { replace: true })}
            aria-label="Close edit book form"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <BookForm
            initialData={initialData}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            submitButtonText="Update Book"
          />
        </CardContent>
      </Card>
    </div>
  )
}
