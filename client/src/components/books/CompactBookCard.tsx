import { Edit2, Trash2 } from "lucide-react";
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

const DEFAULT_BOOK_COVER_IMAGE = "/book_cover.jpg";

const getGenreBadgeClassName = (genre: string) => {
  const key = genre.trim().toLowerCase();

  const genreColorMap: Record<string, string> = {
    fantasy:
      "bg-violet-100 text-violet-700 hover:bg-violet-200 dark:bg-violet-900/40 dark:text-violet-300",
    "self help":
      "bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900/40 dark:text-amber-300",
    technology:
      "bg-cyan-100 text-cyan-800 hover:bg-cyan-200 dark:bg-cyan-900/40 dark:text-cyan-300",
    business:
      "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300",
    fiction:
      "bg-rose-100 text-rose-800 hover:bg-rose-200 dark:bg-rose-900/40 dark:text-rose-300",
    science:
      "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-300",
    history:
      "bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900/40 dark:text-orange-300",
    productivity:
      "bg-lime-100 text-lime-800 hover:bg-lime-200 dark:bg-lime-900/40 dark:text-lime-300",
    finance:
      "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/40 dark:text-green-300",
    philosophy:
      "bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900/40 dark:text-indigo-300",
    programming:
      "bg-sky-100 text-sky-800 hover:bg-sky-200 dark:bg-sky-900/40 dark:text-sky-300",
  };

  return genreColorMap[key] ?? "bg-primary/10 text-primary hover:bg-primary/15";
};

export default function CompactBookCard({
  book,
  onDelete,
  onEdit,
}: CompactBookCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Card className="group gap-0 py-0 overflow-hidden rounded-xl border-border/60 bg-card/95 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative overflow-hidden">
        <div className="aspect-4/3 w-full overflow-hidden bg-linear-to-br from-muted to-muted/60">
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              isImageLoaded ? "opacity-0" : "opacity-100"
            }`}
          >
            <img
              src={DEFAULT_BOOK_COVER_IMAGE}
              alt="Default book cover"
              className="block h-full w-full object-cover"
            />
          </div>
          <img
            src={book.coverImageUrl || DEFAULT_BOOK_COVER_IMAGE}
            alt={book.title}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            onLoad={() => setIsImageLoaded(true)}
            onError={() => setIsImageLoaded(false)}
            className={`block h-full w-full object-cover transition-all duration-300 group-hover:scale-105 ${
              isImageLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </div>

      <CardContent className="space-y-2 p-4">
        <div className="flex items-center justify-between">
          <Badge
            variant="secondary"
            className={`w-fit rounded-full ${getGenreBadgeClassName(book.genre)}`}
          >
            {book.genre}
          </Badge>

          <div className="bottom-3 flex justify-center gap-2">
            <Button
              type="button"
              size="icon"
              variant="secondary"
              onClick={() => onEdit?.(book._id)}
              className="pointer-events-auto h-9 w-9 rounded-full border border-border/50 bg-background/70 shadow-sm backdrop-blur-sm cursor-pointer hover:bg-foreground/10 text-foreground hover:text-foreground"
              aria-label={`Edit ${book.title}`}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="secondary"
              onClick={() => onDelete?.(book._id)}
              className="pointer-events-auto h-9 w-9 rounded-full border border-border/50 bg-background/70 shadow-sm backdrop-blur-sm cursor-pointer hover:bg-red-100 text-destructive hover:text-destructive"
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
