import {config} from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
config();
const apiKey = process.env.PRIVATE_OPENAI_API_KEY||"";

const configuration = new Configuration({apiKey: apiKey})
export const openAi = new OpenAIApi(configuration)
