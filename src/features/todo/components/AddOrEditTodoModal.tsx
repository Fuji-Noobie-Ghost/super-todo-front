import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { AddOrEditTodoForm } from "./AddOrEditTodoForm";
import type { CreateTodoSchema } from "../todo.schema";
import type { Todo } from "../todo.types";

interface AddOrEditTodoModalProps {
  todo?: Todo | null,
  isOpen: boolean
  onSubmit: (payload: CreateTodoSchema) => void
  onClose: () => void
}

export function AddOrEditTodoModal({ todo, isOpen, onSubmit, onClose }: AddOrEditTodoModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{todo ? 'Update todo' : 'New Todo'}</DialogTitle>
      <DialogContent>
        <AddOrEditTodoForm todo={todo} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  )
}
