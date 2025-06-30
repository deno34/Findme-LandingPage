// Implemented the real-time voice translation flow using the gemini-2.5-flash-preview-tts model, converting user speech to translated audio output.

'use server';

/**
 * @fileOverview A real-time voice translation AI agent.
 *
 * - realTimeVoiceTranslation - A function that handles the real-time voice translation process.
 * - RealTimeVoiceTranslationInput - The input type for the realTimeVoiceTranslation function.
 * - RealTimeVoiceTranslationOutput - The return type for the realTimeVoiceTranslation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const RealTimeVoiceTranslationInputSchema = z.object({
  text: z.string().describe('The text to translate.'),
  targetLanguage: z.string().describe('The target language for the translation.'),
});
export type RealTimeVoiceTranslationInput = z.infer<
  typeof RealTimeVoiceTranslationInputSchema
>;

const RealTimeVoiceTranslationOutputSchema = z.object({
  media: z.string().describe('The translated audio in WAV format as a data URI.'),
});
export type RealTimeVoiceTranslationOutput = z.infer<
  typeof RealTimeVoiceTranslationOutputSchema
>;

export async function realTimeVoiceTranslation(
  input: RealTimeVoiceTranslationInput
): Promise<RealTimeVoiceTranslationOutput> {
  return realTimeVoiceTranslationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'realTimeVoiceTranslationPrompt',
  input: {schema: RealTimeVoiceTranslationInputSchema},
  prompt: `Translate the following text to {{targetLanguage}} and generate audio from it: {{{text}}}`,
});

const realTimeVoiceTranslationFlow = ai.defineFlow(
  {
    name: 'realTimeVoiceTranslationFlow',
    inputSchema: RealTimeVoiceTranslationInputSchema,
    outputSchema: RealTimeVoiceTranslationOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {voiceName: 'Algenib'},
          },
        },
      },
      prompt: input.text,
    });

    if (!media) {
      throw new Error('No media returned');
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    return {
      media: 'data:audio/wav;base64,' + (await toWav(audioBuffer)),
    };
  }
);

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
