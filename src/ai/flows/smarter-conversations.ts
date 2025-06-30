// src/ai/flows/smarter-conversations.ts
'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing smarter conversation suggestions.
 *
 * - smarterConversations - A function that provides conversation suggestions based on context.
 * - SmarterConversationsInput - The input type for the smarterConversations function.
 * - SmarterConversationsOutput - The output type for the smarterConversations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmarterConversationsInputSchema = z.object({
  context: z.string().describe('The current context of the conversation.'),
});
export type SmarterConversationsInput = z.infer<typeof SmarterConversationsInputSchema>;

const SmarterConversationsOutputSchema = z.object({
  suggestions: z.array(z.string()).describe('An array of suggested responses or conversation topics.'),
});
export type SmarterConversationsOutput = z.infer<typeof SmarterConversationsOutputSchema>;

export async function smarterConversations(input: SmarterConversationsInput): Promise<SmarterConversationsOutput> {
  return smarterConversationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smarterConversationsPrompt',
  input: {schema: SmarterConversationsInputSchema},
  output: {schema: SmarterConversationsOutputSchema},
  prompt: `You are an AI assistant designed to provide helpful conversation suggestions.

  Given the current context of the conversation, suggest several possible responses or conversation topics that would be appropriate.

  Context: {{{context}}}

  Suggestions:`, 
});

const smarterConversationsFlow = ai.defineFlow(
  {
    name: 'smarterConversationsFlow',
    inputSchema: SmarterConversationsInputSchema,
    outputSchema: SmarterConversationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
