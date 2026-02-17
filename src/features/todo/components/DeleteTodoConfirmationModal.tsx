import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import type { Todo } from "../todo.types";

interface DeleteTodoConfirmationModalProps {
  todo: Todo
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DeleteTodoConfirmationModal({ todo, onClose, isOpen, onConfirm }: DeleteTodoConfirmationModalProps) { 
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Delete todo
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete todo "{todo.title}" ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="error" onClick={onConfirm} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}
