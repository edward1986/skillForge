// src/ai/flows/suggest-project-ideas.ts
'use server';

/**
 * @fileOverview Generates project ideas based on user interests.
 *
 * - suggestProjectIdeas - A function that suggests project ideas based on user interests.
 * - SuggestProjectIdeasInput - The input type for the suggestProjectIdeas function.
 * - SuggestProjectIdeasOutput - The return type for the suggestProjectIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestProjectIdeasInputSchema = z.object({
  interests: z
    .string()
    .describe('The users interests, comma separated, that the project should be related to.'),
});
export type SuggestProjectIdeasInput = z.infer<typeof SuggestProjectIdeasInputSchema>;

const SuggestProjectIdeasOutputSchema = z.object({
  projectIdeas: z
    .array(z.string())
    .describe('An array of project ideas based on the user interests.'),
  technologiesToLearn: z
    .array(z.string())
    .describe('An array of relevant technologies to learn for the suggested projects.'),
});
export type SuggestProjectIdeasOutput = z.infer<typeof SuggestProjectIdeasOutputSchema>;

export async function suggestProjectIdeas(input: SuggestProjectIdeasInput): Promise<SuggestProjectIdeasOutput> {
  return suggestProjectIdeasFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestProjectIdeasPrompt',
  input: {schema: SuggestProjectIdeasInputSchema},
  output: {schema: SuggestProjectIdeasOutputSchema},
  prompt: `You are an AI project idea generator. A user will provide their interests, and you will respond with project ideas and technologies to learn.

Interests: {{{interests}}}

Respond in JSON format.
`,
});

const suggestProjectIdeasFlow = ai.defineFlow(
  {
    name: 'suggestProjectIdeasFlow',
    inputSchema: SuggestProjectIdeasInputSchema,
    outputSchema: SuggestProjectIdeasOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
