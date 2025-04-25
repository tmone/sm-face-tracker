// This file is machine-generated - do not edit!
'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating a set of instructions to help users register their face.
 *
 * The flow takes no input and returns a set of instructions as a string.
 *
 * @public
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateInstructionSetOutputSchema = z.object({
  instructions: z.string().describe('A set of instructions to help users register their face.'),
});
export type GenerateInstructionSetOutput = z.infer<typeof GenerateInstructionSetOutputSchema>;

export async function generateInstructionSet(): Promise<GenerateInstructionSetOutput> {
  return generateInstructionSetFlow({});
}

const prompt = ai.definePrompt({
  name: 'generateInstructionSetPrompt',
  input: {
    schema: z.object({}),
  },
  output: {
    schema: z.object({
      instructions: z.string().describe('A set of instructions to help users register their face.'),
    }),
  },
  prompt: `You are an AI assistant that generates instructions for users to register their face with a face recognition system.

  The instructions should be clear, concise, and easy to follow.

  The instructions should guide the user to capture images from multiple angles, ensuring comprehensive facial data capture.

  The instructions should include:
    - Looking straight at the camera
    - Turning the head slightly to the left
    - Turning the head slightly to the right
    - Tilting the head up slightly
    - Tilting the head down slightly

  The instructions should also mention the importance of good lighting and a clear background.

  The instructions should be no more than 100 words.

  Output the instructions as a single string.

  Here are the instructions:
  `,
});

const generateInstructionSetFlow = ai.defineFlow<
  z.ZodObject<any, any, any, any, any>,
  typeof GenerateInstructionSetOutputSchema
>({
  name: 'generateInstructionSetFlow',
  inputSchema: z.object({}),
  outputSchema: GenerateInstructionSetOutputSchema,
},
async () => {
  const {output} = await prompt({});
  return output!;
});
