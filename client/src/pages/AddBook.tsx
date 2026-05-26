import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { BookFormData } from '../types/book'
import BookForm from '../components/BookForm'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { toast } from 'sonner'
import { createBook } from '../api/books'
import { Button } from '../components/ui/button'
import { X } from 'lucide-react'

export default function AddBook() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: BookFormData) => {
    setIsLoading(true)
    try {
      await createBook({ ...data, publishedYear: Number(data.publishedYear) })
      toast.success('Book added successfully!')
      navigate('/books', { state: { refresh: true } })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to add book')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/20 backdrop-blur-[2px] md:backdrop-blur-sm"
        onClick={() => navigate('/books', { replace: true })}
      />
      <Card className="relative w-full max-w-2xl border-white/20 bg-background/70 supports-backdrop-filter:backdrop-blur-lg shadow-2xl">
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle>Add New Book</CardTitle>
            <p className="text-muted-foreground mt-2 text-sm">Add a new book to your library collection.</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/books', { replace: true })}
            aria-label="Close add book form"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <BookForm onSubmit={handleSubmit} isLoading={isLoading} submitButtonText="Add Book" />
        </CardContent>
      </Card>
    </div>
  )
}
