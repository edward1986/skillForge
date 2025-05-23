'use server';

import { suggestProjectIdeas, type SuggestProjectIdeasInput, type SuggestProjectIdeasOutput } from '@/ai/flows/suggest-project-ideas';
import { AiSuggestionsSchema } from '@/lib/schemas';

export interface AiSuggestionsActionResult {
  success: boolean;
  message?: string;
  data?: SuggestProjectIdeasOutput;
  errors?: {
    interests?: string[];
    form?: string[];
  };
}

export async function getAiSuggestionsAction(
  prevState: AiSuggestionsActionResult | null,
  formData: FormData
): Promise<AiSuggestionsActionResult> {
  const rawFormData = {
    interests: formData.get('interests') as string,
  };

  const validatedFields = AiSuggestionsSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { interests } = validatedFields.data;

  try {
    const input: SuggestProjectIdeasInput = { interests };
    const result = await suggestProjectIdeas(input);
    
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("AI Suggestion Error:", error);
    return {
      success: false,
      message: "Failed to get AI suggestions. Please try again later.",
      errors: { form: ["An unexpected error occurred."] }
    };
  }
}
