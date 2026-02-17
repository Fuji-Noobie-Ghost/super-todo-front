import { Box, Checkbox, IconButton, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { TodoStatus, type Todo } from "../todo.types";
import { Delete, Edit } from "@mui/icons-material";
import { blue } from "@mui/material/colors";

interface TodoItemProps {
  todo: Todo
  onEdit: (todo: Todo) => void
  onDelete: (todo: Todo) => void
  toggleStatus: (todo: Todo) => void
}

export function TodoItem({ onEdit, todo, onDelete, toggleStatus }: TodoItemProps) {
  const handleDelete = () => onDelete(todo)
  const handleToggleStatus = () => toggleStatus(todo)
  const handleEdit = () => onEdit(todo)

  return (
    <ListItem
      sx={{
        border: 'solid',
        borderWidth: '1px',
        my: '8px',
        borderRadius: '12px',
        borderColor: todo.status === TodoStatus.COMPLETED ? blue[500] : 'black',
        bgcolor: todo.status === TodoStatus.COMPLETED ? blue[100] : 'white',
      }}
      secondaryAction={
        <Box>
          {todo.status !== TodoStatus.COMPLETED &&
            <IconButton edge="end" onClick={handleEdit}>
              <Edit />
            </IconButton>
          }
          <IconButton edge="end" onClick={handleDelete}>
            <Delete color="error"/>
          </IconButton>
        </Box>
      }
    >
      <ListItemAvatar>
        <Checkbox
          checked={todo.status === TodoStatus.COMPLETED}
          onChange={handleToggleStatus}
          slotProps={{
            input: { 'aria-label': 'controlled' },
          }}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {todo.title}
          </Typography>
        }
        secondary={
          <Typography
            component="span"
            variant="subtitle2"
            color="textSecondary"
            sx={{
              WebkitLineClamp: '1',
              WebkitBoxOrient: 'vertical',
              display: '-webkit-box',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {todo.description}
          </Typography>
        }
      />
    </ListItem>
  )
}
