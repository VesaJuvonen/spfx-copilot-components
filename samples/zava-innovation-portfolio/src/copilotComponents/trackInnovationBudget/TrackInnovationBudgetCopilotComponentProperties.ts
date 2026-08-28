import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

const schema=z.object({
  period: z.string().optional().describe('period extracted from the user request when provided.'),
  theme: z.string().optional().describe('theme extracted from the user request when provided.'),
  amount: z.number().optional().describe('amount extracted from the user request when provided.')
});
export type ITrackInnovationBudgetCopilotComponentProperties=z.infer<typeof schema>;
export default zodToJsonSchema(schema);
