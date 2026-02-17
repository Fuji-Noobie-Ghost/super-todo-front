import { Checkbox, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import { TodoStatus, type Todo } from "../todo.types";

interface TodoItemProps {
  todo: Todo
}

export function TodoItem({ todo }: TodoItemProps) {
  return (
    <ListItemButton sx={{ border: 'solid', borderWidth: '1px', my: '8px', borderRadius: '12px' }}>
      <ListItemAvatar>
        <Checkbox value={todo.status === TodoStatus.COMPLETED} />
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
            {todo.description} lcgjslgjslgasjdglskglaskg jl dgs ldg  lakdg l klhgl asglk kssagjslgk k glasjdlgkjalgkjalgdjalgkdja sdgkjsadlgksdl  jlgasldkgj lgjasl aslkglsdkgsalgk
          </Typography>
        }
      />
    </ListItemButton>
  )
}
