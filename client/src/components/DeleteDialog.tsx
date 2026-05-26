import { AlertTriangle } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'

interface DeleteDialogProps {
  open: boolean
  title: string
  bookTitle: string
  onConfirm: () => void
  onCancel: () => void
}

export default function DeleteDialog({
  open,
  title,
  bookTitle,
  onConfirm,
  onCancel,
}: DeleteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <AlertDialogContent className="max-w-md">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-red-100 dark:bg-red-950 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
        </div>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Are you sure you want to delete <span className="font-semibold">'{bookTitle}'</span>?
            This action cannot be undone and will permanently remove this record from your library.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex gap-2 justify-end">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
