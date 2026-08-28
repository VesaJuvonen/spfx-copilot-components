import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

const schema=z.object({
  region: z.string().optional().describe('region extracted from the user request when provided.'),
  theme: z.string().optional().describe('theme extracted from the user request when provided.'),
  focus: z.string().optional().describe('focus extracted from the user request when provided.')
});
export type IExploreGlobalInnovationCopilotComponentProperties=z.infer<typeof schema>;
export default zodToJsonSchema(schema);
