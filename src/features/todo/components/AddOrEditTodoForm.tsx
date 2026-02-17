import { Controller, FormProvider, useForm } from "react-hook-form"
import { createTodoSchema, type CreateTodoSchema, type UpdateTodoSchema } from "../todo.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Todo } from "../todo.types"
import { Box, Button, TextareaAutosize, TextField } from "@mui/material"

interface AddOrEditTodoFormProps {
  todo?: Todo | null
  onSubmit: (payload: CreateTodoSchema, todo?: Todo | null) => void
}

export function AddOrEditTodoForm({ todo, onSubmit }: AddOrEditTodoFormProps) {
  const form = useForm<CreateTodoSchema>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: todo?.title ?? '',
      description: todo?.description ?? ''
    }
  })

  const submitHandler = (payload: CreateTodoSchema) => {
    onSubmit(payload, todo)
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px', py: '20px' }}>
          <Controller
            control={form.control}
            name="title"
            render={({field}) => (
              <TextField variant="outlined" label="Title" {...field} />
            )}
          />
          <Controller
            control={form.control}
            name="description"
            render={({field}) => (
              <TextareaAutosize
                minRows={5}
                maxRows={10}
                placeholder="Description..."
                style={{
                  padding: '12px',
                  fontFamily: 'Poppins'
                }}
                {...field}
              /> 
            )}
          />
        </Box>
        <Button type="submit" variant="contained">Save</Button>
      </form>
    </FormProvider>
  )
}
