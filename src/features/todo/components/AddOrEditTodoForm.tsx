import { Controller, FormProvider, useForm } from "react-hook-form"
import { createTodoSchema, type CreateTodoFormValues, type CreateTodoSchema } from "../todo.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Todo, TodoSuggestionResponse } from "../todo.types"
import { Box, Button, TextField } from "@mui/material"
import { Save } from "@mui/icons-material"
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs"
import { CompleteTodoFormWithAIButton } from "./CompleteTodoFormWithAIButton"

interface AddOrEditTodoFormProps {
  todo?: Todo | null
  onSubmit: (payload: CreateTodoSchema, todo?: Todo | null) => void
}

export function AddOrEditTodoForm({ todo, onSubmit }: AddOrEditTodoFormProps) {
  const form = useForm<CreateTodoFormValues, unknown, CreateTodoSchema>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: todo?.title ?? '',
      description: todo?.description ?? '',
      dueDate: todo?.dueDate ? dayjs(todo.dueDate) : dayjs(),
    },
    mode: 'onChange'
  })

  const submitHandler = (payload: CreateTodoSchema) => {
    console.log(payload)
    onSubmit(payload, todo)
  }

  const onSuggestionReceived = (suggestion: TodoSuggestionResponse) => {
    form.setValue('description', suggestion.description)
    form.setValue('dueDate', dayjs(suggestion.suggestedDateTime))
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            py: '20px',
          }}
        >
          <Controller
            control={form.control}
            name="title"
            render={({field, fieldState}) => (
              <TextField 
                variant="outlined"
                label="Title"
                error={!!fieldState.error}
                helperText={fieldState.error?.message as string}
                {...field}
              />
            )}
          />

          <CompleteTodoFormWithAIButton onSuggestionReveived={onSuggestionReceived} />

          <Controller
            control={form.control}
            name="description"
            render={({field, fieldState}) => (
              <TextField
                label="Description"
                error={!!fieldState.error}
                helperText={fieldState.error?.message as string}
                multiline
                rows={5}
                {...field}
              />
            )}
          />
          <Controller
            control={form.control}
            name="dueDate"
            render={({field, fieldState}) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Due date"
                  value={field.value ?? null}
                  onChange={(date: Dayjs | null) => field.onChange(date)}
                  minDateTime={dayjs()}
                  slotProps={{
                    textField: {
                      error: !!fieldState.error,
                      helperText: fieldState.error?.message,
                      onBlur: field.onBlur,
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />
          <Button type="submit" variant="contained">
            <Save sx={{ mr: '4px' }} /> Save
          </Button>
        </Box>
      </form>
    </FormProvider>
  )
}
