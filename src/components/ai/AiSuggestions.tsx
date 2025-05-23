'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useActionState, useEffect } from 'react'; // Changed from react-dom
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AiSuggestionsSchema, type AiSuggestionsFormValues } from '@/lib/schemas';
import { getAiSuggestionsAction, type AiSuggestionsActionResult } from '@/app/(app)/ai-suggestions/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Lightbulb, Code } from 'lucide-react';

const initialState: AiSuggestionsActionResult = {
  success: false,
};

function SuggestionSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full sm:w-auto" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Get Suggestions
    </Button>
  );
}

export default function AiSuggestions() {
  const [state, formAction] = useActionState(getAiSuggestionsAction, initialState); // Renamed useFormState to useActionState
  const { toast } = useToast();

  const form = useForm<AiSuggestionsFormValues>({
    resolver: zodResolver(AiSuggestionsSchema),
    defaultValues: {
      interests: '',
    },
  });

  useEffect(() => {
    if (state?.message && !state.success) {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <div className="space-y-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>AI Project Suggester</CardTitle>
          <CardDescription>
            Tell us your interests, and our AI will suggest relevant project ideas and technologies to learn.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form action={formAction} className="space-y-6">
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Interests</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Web development, Machine Learning, Gaming" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter a few interests, comma-separated.
                    </FormDescription>
                    <FormMessage>{state?.errors?.interests?.[0]}</FormMessage>
                  </FormItem>
                )}
              />
              {state?.errors?.form && (
                <p className="text-sm font-medium text-destructive">{state.errors.form.join(', ')}</p>
              )}
              <SuggestionSubmitButton />
            </form>
          </Form>
        </CardContent>
      </Card>

      {state?.success && state.data && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Lightbulb className="h-6 w-6 text-primary" />
              <CardTitle>Project Ideas</CardTitle>
            </CardHeader>
            <CardContent>
              {state.data.projectIdeas.length > 0 ? (
                <ul className="space-y-2 list-disc list-inside text-sm">
                  {state.data.projectIdeas.map((idea, index) => (
                    <li key={index}>{idea}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No project ideas generated. Try broadening your interests.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
               <Code className="h-6 w-6 text-primary" />
              <CardTitle>Technologies to Learn</CardTitle>
            </CardHeader>
            <CardContent>
              {state.data.technologiesToLearn.length > 0 ? (
                <ul className="space-y-2 list-disc list-inside text-sm">
                  {state.data.technologiesToLearn.map((tech, index) => (
                    <li key={index}>{tech}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No specific technologies suggested.</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
