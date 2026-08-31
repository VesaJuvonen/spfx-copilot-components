import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

const schema = z.object({
  caseId: z.string().optional().describe('caseId extracted from the user request when provided.'),
  customerId: z.string().optional().describe('customerId extracted from the user request when provided.'),
  product: z.string().optional().describe('product extracted from the user request when provided.'),
  region: z.string().optional().describe('region extracted from the user request when provided.')
});
export type IReviewEntitlementCoverageCopilotComponentProperties = z.infer<typeof schema>;
export default zodToJsonSchema(schema);
