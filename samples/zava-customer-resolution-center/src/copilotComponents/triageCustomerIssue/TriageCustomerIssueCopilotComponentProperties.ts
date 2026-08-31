import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

const schema = z.object({
  customerHint: z.string().optional().describe('customerHint extracted from the user request when provided.'),
  productHint: z.string().optional().describe('productHint extracted from the user request when provided.'),
  channel: z.string().optional().describe('channel extracted from the user request when provided.'),
  language: z.string().optional().describe('language extracted from the user request when provided.')
});
export type ITriageCustomerIssueCopilotComponentProperties = z.infer<typeof schema>;
export default zodToJsonSchema(schema);
