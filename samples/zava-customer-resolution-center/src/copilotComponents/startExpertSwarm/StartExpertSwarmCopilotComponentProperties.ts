import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

const schema = z.object({
  caseId: z.string().optional().describe('caseId extracted from the user request when provided.'),
  region: z.string().optional().describe('region extracted from the user request when provided.'),
  focus: z.string().optional().describe('focus extracted from the user request when provided.'),
  selectedId: z.string().optional().describe('selectedId extracted from the user request when provided.')
});
export type IStartExpertSwarmCopilotComponentProperties = z.infer<typeof schema>;
export default zodToJsonSchema(schema);
