import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

const schema = z.object({
  exceptionId: z.string().optional().describe('exceptionId extracted from the user request when provided.'),
  opportunityId: z.string().optional().describe('opportunityId extracted from the user request when provided.'),
  focus: z.string().optional().describe('focus extracted from the user request when provided.'),
  selectedId: z.string().optional().describe('selectedId extracted from the user request when provided.')
});
export type IReviewDealExceptionCopilotComponentProperties = z.infer<typeof schema>;
export default zodToJsonSchema(schema);
