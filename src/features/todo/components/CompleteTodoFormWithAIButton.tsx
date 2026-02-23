import { useFormContext, useWatch } from "react-hook-form";
import { Button } from "@mui/material";
import { AutoAwesome } from "@mui/icons-material";
import { useState } from "react";
import type { TodoSuggestionInput, TodoSuggestionResponse } from "../todo.types";
import { todoService } from "../todo.service";

interface CompleteTodoFormWithAIButtonProps {
  onSuggestionReveived: (suggestion: TodoSuggestionResponse) => void
}

export function CompleteTodoFormWithAIButton({ onSuggestionReveived }: CompleteTodoFormWithAIButtonProps) {
  const titleValue = useWatch({ name: "title" })
  const descriptionValue = useWatch({ name: "description" })
  const { formState: { errors } } = useFormContext()
  const isTitleValid = titleValue.length >= 5 && !errors.title && descriptionValue.length <= 5;

  const [isAILoading, setIsAILoading] = useState(false)

  const generateWithAI = async () => {
    setIsAILoading(true)
    
    if (titleValue.length < 5) return

    const payload: TodoSuggestionInput = {title: titleValue}

    try {
      const suggestion = await todoService.getSuggestion(payload)
      onSuggestionReveived(suggestion)
    } catch (error) {}

    setIsAILoading(false)
  }

  return (
    <>
      {
        (isTitleValid) &&
          <Button
            sx={{ m: 2 }}
            onClick={generateWithAI}
            disabled={isAILoading}
            loading={isAILoading}
          >
            <AutoAwesome sx={{ mr: 2 }} /> Complete the rest with AI
          </Button>
      }
    </>
  )
}

