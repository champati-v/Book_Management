import api from './axios'
import type { Book, BookFormData } from '../types/book'

interface GetBooksParams {
  search?: string
  genre?: string
}

export const getBooks = async (params?: GetBooksParams) => {
  const { data } = await api.get<{ success: boolean; totalBooks: number; books: Book[] }>('/books', {
    params,
    withCredentials: true,
  })
  return data
}

export const getBookById = async (id: string) => {
  const { data } = await api.get<{ success: boolean; book: Book }>(`/books/${id}`, {
    withCredentials: true,
  })
  return data
}

export const createBook = async (payload: BookFormData) => {
  const { data } = await api.post<{ success: boolean; message: string; book: Book }>('/books', payload, {
    withCredentials: true,
  })
  return data
}

export const updateBook = async (id: string, payload: BookFormData) => {
  const { data } = await api.put<{ success: boolean; message: string; book: Book }>(`/books/${id}`, payload, {
    withCredentials: true,
  })
  return data
}

export const deleteBook = async (id: string) => {
  const { data } = await api.delete<{ success: boolean; message: string }>(`/books/${id}`, {
    withCredentials: true,
  })
  return data
}
