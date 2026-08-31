import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

const schema = z.object({
  caseId: z.string().optional().describe('caseId extracted from the user request when provided.'),
  product: z.string().optional().describe('product extracted from the user request when provided.'),
  period: z.string().optional().describe('period extracted from the user request when provided.'),
  selectedId: z.string().optional().describe('selectedId extracted from the user request when provided.')
});
export type IDiagnoseCaseEvidenceCopilotComponentProperties = z.infer<typeof schema>;
export default zodToJsonSchema(schema);
