import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

const schema = z.object({
  opportunityId: z.string().optional().describe('opportunityId extracted from the user request when provided.'),
  quantity: z.number().optional().describe('quantity extracted from the user request when provided.'),
  termMonths: z.number().optional().describe('termMonths extracted from the user request when provided.'),
  discount: z.number().optional().describe('discount extracted from the user request when provided.'),
  services: z.number().optional().describe('services extracted from the user request when provided.'),
  probability: z.number().optional().describe('probability extracted from the user request when provided.')
});
export type ISimulateCommercialOfferCopilotComponentProperties = z.infer<typeof schema>;
export default zodToJsonSchema(schema);
