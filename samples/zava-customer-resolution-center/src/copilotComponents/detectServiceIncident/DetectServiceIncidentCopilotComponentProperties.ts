import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

const schema = z.object({
  caseId: z.string().optional().describe('caseId extracted from the user request when provided.'),
  product: z.string().optional().describe('product extracted from the user request when provided.'),
  region: z.string().optional().describe('region extracted from the user request when provided.'),
  period: z.string().optional().describe('period extracted from the user request when provided.'),
  similarityThreshold: z.number().optional().describe('similarityThreshold extracted from the user request when provided.')
});
export type IDetectServiceIncidentCopilotComponentProperties = z.infer<typeof schema>;
export default zodToJsonSchema(schema);
