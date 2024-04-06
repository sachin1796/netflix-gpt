import OpenAI from 'openai';
import { GPT_KEY } from './constants';
// const key = process.env.GPT_KEY


const openai = new OpenAI({
  apiKey: GPT_KEY,
  dangerouslyAllowBrowser: true,
});

export default openai;