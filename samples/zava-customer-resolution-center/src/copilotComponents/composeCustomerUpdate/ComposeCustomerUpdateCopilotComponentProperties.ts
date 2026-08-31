import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

const schema = z.object({
  caseId: z.string().optional().describe('caseId extracted from the user request when provided.'),
  channel: z.string().optional().describe('channel extracted from the user request when provided.'),
  language: z.string().optional().describe('language extracted from the user request when provided.'),
  focus: z.string().optional().describe('focus extracted from the user request when provided.')
});
export type IComposeCustomerUpdateCopilotComponentProperties = z.infer<typeof schema>;
export default zodToJsonSchema(schema);
