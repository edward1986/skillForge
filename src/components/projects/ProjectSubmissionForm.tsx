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
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectSubmissionSchema, type ProjectSubmissionFormValues } from '@/lib/schemas';
import { submitProjectAction, type SubmitProjectActionResult } from '@/app/(app)/submit-project/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const initialState: SubmitProjectActionResult = {
  success: false,
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full sm:w-auto" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Submit Project
    </Button>
  );
}

export default function ProjectSubmissionForm() {
  const [state, formAction] = useActionState(submitProjectAction, initialState); // Renamed useFormState to useActionState
  const { toast } = useToast();

  const form = useForm<ProjectSubmissionFormValues>({
    resolver: zodResolver(ProjectSubmissionSchema),
    defaultValues: {
      projectName: '',
      description: '',
      teamMembers: '',
      roles: '',
      plannedContributions: '',
    },
  });

  useEffect(() => {
    if (state?.message) {
      if (state.success) {
        toast({
          title: 'Success!',
          description: state.message,
        });
        form.reset(); // Reset form on successful submission
      } else {
        toast({
          title: 'Error',
          description: state.message,
          variant: 'destructive',
        });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, toast]); // form.reset is stable, toast is stable

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Submit New Project</CardTitle>
        <CardDescription>
          Propose a new project for Skill Forge. Fill in the details below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action={formAction} className="space-y-6">
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., AI-Powered Task Manager" {...field} />
                  </FormControl>
                  <FormMessage>{state?.errors?.projectName?.[0]}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your project, its goals, and expected outcomes."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{state?.errors?.description?.[0]}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="teamMembers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Members</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., John Doe, Jane Smith (comma-separated)" {...field} />
                  </FormControl>
                  <FormDescription>
                    List the names of team members. If solo, you can put your name or "Solo".
                  </FormDescription>
                  <FormMessage>{state?.errors?.teamMembers?.[0]}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="roles"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Roles</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Define the roles within the team (e.g., Frontend Developer, Project Manager, UI/UX Designer)."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{state?.errors?.roles?.[0]}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="plannedContributions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Planned Contributions</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Outline what each team member (or yourself, if solo) plans to contribute to the project."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{state?.errors?.plannedContributions?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            
            {state?.errors?.form && (
              <p className="text-sm font-medium text-destructive">{state.errors.form.join(', ')}</p>
            )}

            <SubmitButton />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
