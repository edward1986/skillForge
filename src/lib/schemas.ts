import { z } from 'zod';

export const ProjectSubmissionSchema = z.object({
  projectName: z.string().min(3, { message: "Project name must be at least 3 characters." }).max(100),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }).max(1000),
  teamMembers: z.string().min(2, { message: "Please list team members or N/A."}), // Comma-separated for simplicity
  roles: z.string().min(5, { message: "Please describe roles."}).max(500),
  plannedContributions: z.string().min(10, { message: "Please describe planned contributions."}).max(1000),
});

export type ProjectSubmissionFormValues = z.infer<typeof ProjectSubmissionSchema>;

export const AiSuggestionsSchema = z.object({
  interests: z.string().min(3, { message: "Please enter at least one interest."}).max(200),
});

export type AiSuggestionsFormValues = z.infer<typeof AiSuggestionsSchema>;
