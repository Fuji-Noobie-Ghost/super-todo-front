import { Box, Button, Checkbox, IconButton, ListItem, ListItemAvatar, ListItemText, Popover, Typography } from "@mui/material";
import { TodoStatus, type Todo } from "../todo.types";
import { CalendarToday, Delete, Edit, MoreVert, Visibility } from "@mui/icons-material";
import { blue, red } from "@mui/material/colors";
import { DateFormat } from "../../../core/utils/format";
import { useState } from "react";

interface TodoItemProps {
  todo: Todo
  onEdit: (todo: Todo) => void
  onDelete: (todo: Todo) => void
  onViewDetail: (todo: Todo) => void
  toggleStatus: (todo: Todo) => void
}

export function TodoItem({ onEdit, onViewDetail, todo, onDelete, toggleStatus }: TodoItemProps) {
  const handleActionWithTodo = (action: (t: Todo) => void) => {
    return () => action(todo)
  }

  const handleDelete = handleActionWithTodo(onDelete)
  const handleToggleStatus = handleActionWithTodo(toggleStatus)
  const handleEdit = handleActionWithTodo(onEdit)
  const handleViewDetail = handleActionWithTodo(onViewDetail)

  const normalizedDueDate = new Date(todo.dueDate)

  const dueDate = DateFormat.formatTodoDate(normalizedDueDate)

  const isExpired = todo.status !== TodoStatus.COMPLETED && normalizedDueDate <= new Date()


  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'action-popover' : undefined;

  return (
    <ListItem
      sx={{
        border: 'solid',
        borderWidth: '1px',
        my: '8px',
        borderRadius: '12px',
        borderColor: todo.status === TodoStatus.COMPLETED
          ? blue[500]
          : isExpired ? red[500] : 'black',
        bgcolor: todo.status === TodoStatus.COMPLETED
          ? blue[100]
          : isExpired ? red[100] : 'white',
      }}
      secondaryAction={
        <>
          <IconButton
            aria-describedby={id}
            sx={{ display: { xs: 'block', sm: 'none' } }}
            edge='end'
            onClick={handleClick}
          >
            <MoreVert />
          </IconButton>
          <Popover 
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' width='100px' gap='12px' padding='4px'>
              <Button onClick={handleViewDetail}>
                <Visibility sx={{ mr: '8px' }} /> Detail
              </Button>
              {todo.status !== TodoStatus.COMPLETED &&
                <Button onClick={handleEdit}>
                  <Edit sx={{ mr: '8px' }}/> Edit
                </Button>
              }
              <Button onClick={handleDelete} color="error">
                <Delete color="error" sx={{ mr: '8px' }}/> Delete
              </Button>
            </Box>
          </Popover>

          <Box display={{ xs: 'none', sm: 'flex' }} gap='12px'>
            <IconButton edge="end" onClick={handleViewDetail}>
              <Visibility />
            </IconButton>
            {todo.status !== TodoStatus.COMPLETED &&
              <IconButton edge="end" onClick={handleEdit}>
                <Edit />
              </IconButton>
            }
            <IconButton edge="end" onClick={handleDelete}>
              <Delete color="error"/>
            </IconButton>
          </Box>
        </>
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
            component='span'
            variant="subtitle2"
            color={ isExpired ? 'error' : "textSecondary"}
            sx={{
              display: 'flex',
              alignItems: 'center', // Vertically centers the items
              gap: '8px', // Optional: adds some space between the icon and text
            }}
          >
            <CalendarToday fontSize="small" color={ isExpired ? 'error' : 'action' }/>
            {dueDate}
          </Typography>
        }
        /* secondary={
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
        } */
      />
    </ListItem>
  )
}
