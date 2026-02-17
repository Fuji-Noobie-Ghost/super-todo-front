import { Checkbox, IconButton, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { TodoStatus, type Todo } from "../todo.types";
import { Delete } from "@mui/icons-material";
import { blue } from "@mui/material/colors";

interface TodoItemProps {
  todo: Todo
  onDelete: (todo: Todo) => void
  toggleStatus: (todo: Todo) => void
}

export function TodoItem({ todo, onDelete, toggleStatus }: TodoItemProps) {
  const handleDelete = () => onDelete(todo)
  const handleToggleStatus = () => toggleStatus(todo)

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
        <IconButton edge="end" onClick={handleDelete}>
          <Delete color="error"/>
        </IconButton>
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
