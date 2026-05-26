import { Book as BookIcon } from 'lucide-react'
import { useState } from 'react'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'
import type { Book } from '../../types/book'

interface DashboardBookCardProps {
  book: Book
  onClick?: (id: string) => void
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
      className="group h-[176px] overflow-hidden rounded-xl border-border/60 bg-card/95 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex h-full flex-col sm:flex-row">
        <div className="relative h-24 sm:h-full sm:w-36 md:w-40 shrink-0 overflow-hidden bg-gradient-to-br from-muted to-muted/60">
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              isImageLoaded ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <BookIcon className="h-8 w-8 text-muted-foreground" />
          </div>
          {book.coverImageUrl ? (
            <img
              src={book.coverImageUrl}
              alt={book.title}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              onLoad={() => setIsImageLoaded(true)}
              onError={() => setIsImageLoaded(false)}
              className={`h-full w-full object-cover transition-all duration-300 group-hover:scale-[1.02] ${
                isImageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : null}
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 p-4">
          <Badge
            variant="secondary"
            className="w-fit rounded-full bg-primary/10 text-primary hover:bg-primary/15"
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
