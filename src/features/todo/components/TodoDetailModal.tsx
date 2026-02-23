import { Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import type { Todo } from "../todo.types";

interface TodoDetailModalProps {
  todo: Todo,
  isOpen: boolean
  onClose: () => void
}

export function TodoDetailModal({ todo, isOpen, onClose }: TodoDetailModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth='sm'>
      <DialogTitle>{todo.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {todo.description}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

