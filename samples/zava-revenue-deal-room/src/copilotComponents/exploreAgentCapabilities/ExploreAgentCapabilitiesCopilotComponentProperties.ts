import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

const schema = z.object({
  query: z.string().optional().describe('query extracted from the user request when provided.'),
  focus: z.string().optional().describe('focus extracted from the user request when provided.')
});
export type IExploreAgentCapabilitiesCopilotComponentProperties = z.infer<typeof schema>;
export default zodToJsonSchema(schema);
