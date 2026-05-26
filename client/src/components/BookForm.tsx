import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { BookFormData } from '../types/book'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

interface BookFormProps {
  initialData?: BookFormData
  onSubmit: (data: BookFormData) => void
  isLoading?: boolean
  submitButtonText?: string
}

const GENRES = ['Fantasy', 'Self Help', 'Technology', 'Business', 'Fiction', 'Science', 'History']

export default function BookForm({
  initialData,
  onSubmit,
  isLoading,
  submitButtonText = 'Save Book',
}: BookFormProps) {
  const [genre, setGenre] = useState(initialData?.genre || '')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<BookFormData>({
    defaultValues: initialData || {},
  })

  const validateYear = (value: string | number) => {
    const year = Number(value)
    const currentYear = new Date().getFullYear()
    if (year < 1000 || year > currentYear) {
      return 'Please enter a valid year.'
    }
    return true
  }

  const handleFormSubmit = (data: BookFormData) => {
    if (!genre) {
      return
    }
    onSubmit({ ...data, genre, publishedYear: Number(data.publishedYear) })
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="title">Book Title</Label>
        <Input
          id="title"
          placeholder="e.g. Atomic Habits"
          {...register('title', { required: 'Title is required' })}
          className={errors.title ? 'border-red-500' : ''}
        />
        {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          placeholder="e.g. James Clear"
          {...register('author', { required: 'Author is required' })}
          className={errors.author ? 'border-red-500' : ''}
        />
        {errors.author && <p className="text-sm text-red-500 mt-1">{errors.author.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="genre">Genre</Label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="">Select genre</option>
            {GENRES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          {isSubmitted && !genre && <p className="text-sm text-red-500 mt-1">Genre is required</p>}
        </div>

        <div>
          <Label htmlFor="publishedYear">Publication Year</Label>
          <Input
            id="publishedYear"
            type="number"
            placeholder="2023"
            {...register('publishedYear', {
              required: 'Publication year is required',
              validate: validateYear,
            })}
            className={errors.publishedYear ? 'border-red-500' : ''}
          />
          {errors.publishedYear && (
            <p className="text-sm text-red-500 mt-1">{errors.publishedYear.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="coverImageUrl">Cover Image URL</Label>
        <Input
          id="coverImageUrl"
          placeholder="https://example.com/cover.jpg"
          {...register('coverImageUrl')}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? 'Saving...' : submitButtonText}
        </Button>
      </div>
    </form>
  )
}
