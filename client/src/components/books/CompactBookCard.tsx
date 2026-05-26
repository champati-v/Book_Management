import { Book as BookIcon, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import type { Book } from "../../types/book";

interface CompactBookCardProps {
  book: Book;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export default function CompactBookCard({
  book,
  onDelete,
  onEdit,
}: CompactBookCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Card className="group overflow-hidden rounded-xl border-border/60 bg-card/95 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative overflow-hidden">
        <div className="aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-muted to-muted/60">
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              isImageLoaded ? "opacity-0" : "opacity-100"
            }`}
          >
            <BookIcon className="h-10 w-10 text-muted-foreground" />
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
              className={`h-full w-full object-cover transition-all duration-300 group-hover:scale-105 ${
                isImageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          ) : null}
        </div>
      </div>

      <CardContent className="space-y-2 p-4">
        <div className="flex items-center justify-between">
          <Badge
            variant="secondary"
            className="w-fit rounded-full bg-primary/10 text-primary hover:bg-primary/15"
          >
            {book.genre}
          </Badge>

          <div className="bottom-3 flex justify-center gap-2">
            <Button
              type="button"
              size="icon"
              variant="secondary"
              onClick={() => onEdit?.(book._id)}
              className="pointer-events-auto h-9 w-9 rounded-full border border-border/50 bg-background/70 shadow-sm backdrop-blur-sm hover:bg-background"
              aria-label={`Edit ${book.title}`}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="secondary"
              onClick={() => onDelete?.(book._id)}
              className="pointer-events-auto h-9 w-9 rounded-full border border-border/50 bg-background/70 shadow-sm backdrop-blur-sm hover:bg-background text-destructive hover:text-destructive"
              aria-label={`Delete ${book.title}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
          {book.title}
        </h3>
        <div className="flex items-center justify-between gap-3">
          <p className="line-clamp-1 text-xs text-muted-foreground">
            {book.author}
          </p>
          <p className="shrink-0 text-xs text-muted-foreground">
            {book.publishedYear}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
