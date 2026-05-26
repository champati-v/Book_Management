import { Book as BookIcon } from 'lucide-react'
import { useState } from 'react'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'
import type { Book } from '../../types/book'

interface DashboardBookCardProps {
  book: Book
  onClick?: (id: string) => void
}

const DEFAULT_BOOK_COVER_IMAGE = '/default-book-cover.png'

const getGenreBadgeClassName = (genre: string) => {
  const key = genre.trim().toLowerCase()

  const genreColorMap: Record<string, string> = {
    fantasy: 'bg-violet-100 text-violet-700 hover:bg-violet-200 dark:bg-violet-900/40 dark:text-violet-300',
    'self help': 'bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/40 dark:text-amber-300',
    technology: 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200 dark:bg-cyan-900/40 dark:text-cyan-300',
    business: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300',
    fiction: 'bg-rose-100 text-rose-800 hover:bg-rose-200 dark:bg-rose-900/40 dark:text-rose-300',
    science: 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-300',
    history: 'bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900/40 dark:text-orange-300',
    productivity: 'bg-lime-100 text-lime-800 hover:bg-lime-200 dark:bg-lime-900/40 dark:text-lime-300',
    finance: 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/40 dark:text-green-300',
    philosophy: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900/40 dark:text-indigo-300',
    programming: 'bg-sky-100 text-sky-800 hover:bg-sky-200 dark:bg-sky-900/40 dark:text-sky-300',
  }

  return genreColorMap[key] ?? 'bg-primary/10 text-primary hover:bg-primary/15'
}

export default function DashboardBookCard({ book, onClick }: DashboardBookCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  return (
    <Card
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={() => onClick?.(book._id)}
      onKeyDown={(event) => {
        if (!onClick) return
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onClick(book._id)
        }
      }}
      className="group h-44 gap-0 py-0 overflow-hidden rounded-xl border-border/60 bg-card/95 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex h-full flex-col sm:flex-row">
        <div className="relative h-24 sm:h-full sm:w-36 md:w-40 shrink-0 overflow-hidden bg-linear-to-br from-muted to-muted/60">
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              isImageLoaded ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <BookIcon className="h-8 w-8 text-muted-foreground" />
          </div>
          <img
            src={book.coverImageUrl || DEFAULT_BOOK_COVER_IMAGE}
            alt={book.title}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            onLoad={() => setIsImageLoaded(true)}
            onError={() => setIsImageLoaded(false)}
            className={`block h-full w-full object-cover transition-all duration-300 group-hover:scale-[1.02] ${
              isImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 p-4">
          <Badge
            variant="secondary"
            className={`w-fit rounded-full ${getGenreBadgeClassName(book.genre)}`}
          >
            {book.genre}
          </Badge>
          <h3 className="line-clamp-2 text-base font-semibold tracking-tight text-foreground">
            {book.title}
          </h3>
          <p className="line-clamp-1 text-sm font-medium text-foreground/80">{book.author}</p>
          <p className="text-xs text-muted-foreground">Published {book.publishedYear}</p>
        </div>
      </div>
    </Card>
  )
}
