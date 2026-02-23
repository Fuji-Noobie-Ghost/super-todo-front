import { Box, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, Typography } from "@mui/material";
import { TodoStatus, type Todo } from "../todo.types";
import { DateFormat } from "../../../core/utils/format";
import { Delete, Edit } from "@mui/icons-material";
import { useTodoModal } from "../TodoModal";

interface TodoDetailModalProps {
  todo: Todo,
  isOpen: boolean
  onClose: () => void
}

export function TodoDetailModal({ todo, isOpen, onClose }: TodoDetailModalProps) {
  const todoModal = useTodoModal()

  const normalizedDueDate = new Date(todo.dueDate)

  const formatedCreatedDate = DateFormat.formatTodoDate(new Date(todo.createdAt))
  const formatedDueDate = DateFormat.formatTodoDate(normalizedDueDate)

  const isExpired = todo.status !== TodoStatus.COMPLETED && normalizedDueDate <= new Date()

  const handleDelete = () => todoModal.openDeleteConfirmation(todo)
  const handleEdit = () => todoModal.openAddOrEditModal(todo)

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth='xs' fullWidth>
      <DialogTitle>{todo.title}</DialogTitle>
      <DialogContent>
        <Typography fontWeight='bold'>Create Date : {formatedCreatedDate}</Typography>
        <Typography fontWeight='bold' color={isExpired ? 'error' : 'textPrimary'}>Due Date : {formatedDueDate}</Typography>
        <DialogContentText marginY='20px'>
          {todo.description}
        </DialogContentText>
        <Box display='flex' justifyContent='end' gap={2}>
          {todo.status !== TodoStatus.COMPLETED &&
            <IconButton edge="end" onClick={handleEdit}>
              <Edit />
            </IconButton>
          }
          <IconButton edge="end" onClick={handleDelete}>
            <Delete color="error"/>
          </IconButton>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

