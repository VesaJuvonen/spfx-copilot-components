import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

const schema = z.object({
  customerId: z.string().optional().describe('customerId extracted from the user request when provided.'),
  focus: z.string().optional().describe('focus extracted from the user request when provided.'),
  amount: z.number().optional().describe('amount extracted from the user request when provided.'),
  period: z.string().optional().describe('period extracted from the user request when provided.')
});
export type IPlanCustomerWinBackCopilotComponentProperties = z.infer<typeof schema>;
export default zodToJsonSchema(schema);
