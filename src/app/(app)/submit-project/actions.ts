'use server';

import { ProjectSubmissionSchema, type ProjectSubmissionFormValues } from '@/lib/schemas';

export interface SubmitProjectActionResult {
  success: boolean;
  message: string;
  projectId?: string;
  errors?: {
    [key in keyof ProjectSubmissionFormValues]?: string[];
  } & { form?: string[] };
}

export async function submitProjectAction(
  prevState: SubmitProjectActionResult | null,
  formData: FormData
): Promise<SubmitProjectActionResult> {
  const rawFormData = Object.fromEntries(formData.entries());
  
  const validatedFields = ProjectSubmissionSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed. Please check the form.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { projectName, description, teamMembers, roles, plannedContributions } = validatedFields.data;

  // Here you would typically save the project to a database
  // For now, we'll simulate a successful submission
  console.log("New Project Submitted:", {
    projectName,
    description,
    teamMembers: teamMembers.split(',').map(s => s.trim()),
    roles,
    plannedContributions,
  });

  // Simulate DB operation
  await new Promise(resolve => setTimeout(resolve, 1000));
  const newProjectId = Math.random().toString(36).substring(7);

  return {
    success: true,
    message: `Project "${projectName}" submitted successfully!`,
    projectId: newProjectId,
  };
}
