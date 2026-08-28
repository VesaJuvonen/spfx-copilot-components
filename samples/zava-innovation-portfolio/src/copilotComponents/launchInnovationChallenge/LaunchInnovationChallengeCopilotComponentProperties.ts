import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

const schema=z.object({
  message: z.string().optional().describe('message extracted from the user request when provided.'),
  theme: z.string().optional().describe('theme extracted from the user request when provided.'),
  region: z.string().optional().describe('region extracted from the user request when provided.')
});
export type ILaunchInnovationChallengeCopilotComponentProperties=z.infer<typeof schema>;
export default zodToJsonSchema(schema);
