import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

const schema=z.object({
  message: z.string().optional().describe('message extracted from the user request when provided.'),
  ideaId: z.string().optional().describe('ideaId extracted from the user request when provided.'),
  theme: z.string().optional().describe('theme extracted from the user request when provided.'),
  focus: z.string().optional().describe('focus extracted from the user request when provided.')
});
export type ISubmitInnovationIdeaCopilotComponentProperties=z.infer<typeof schema>;
export default zodToJsonSchema(schema);
