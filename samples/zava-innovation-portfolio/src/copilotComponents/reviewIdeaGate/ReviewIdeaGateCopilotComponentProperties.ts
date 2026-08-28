import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

const schema=z.object({
  ideaId: z.string().optional().describe('ideaId extracted from the user request when provided.'),
  focus: z.string().optional().describe('focus extracted from the user request when provided.'),
  message: z.string().optional().describe('message extracted from the user request when provided.')
});
export type IReviewIdeaGateCopilotComponentProperties=z.infer<typeof schema>;
export default zodToJsonSchema(schema);
