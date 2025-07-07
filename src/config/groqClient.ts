import Groq from 'groq-sdk';
import { envs } from './envs';

export const groqClient = new Groq({
  apiKey: envs.GROQ_API_KEY
});
