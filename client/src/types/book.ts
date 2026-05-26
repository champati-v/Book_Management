export interface Book {
  _id: string
  title: string
  author: string
  genre: string
  publishedYear: number
  coverImageUrl: string
  createdAt?: string
  updatedAt?: string
}

export interface BookFormData {
  title: string
  author: string
  genre: string
  publishedYear: number | string
  coverImageUrl?: string
}
