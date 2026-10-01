import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

const propertiesSchema = z.object({
  startDate: z.string().optional().describe('Optional inclusive start date in ISO format (yyyy-mm-dd).'),
  endDate: z.string().optional().describe('Optional inclusive end date in ISO format (yyyy-mm-dd).'),
  country: z.string().optional().describe('Optional country whose fixed holidays should be excluded.'),
  region: z.string().optional().describe('Optional state, province, or region.'),
  includeOptional: z.boolean().optional().describe('Whether optional holidays count as non-working days.')
});

export type IWorkingDayCalculatorProperties = z.infer<typeof propertiesSchema>;
export default zodToJsonSchema(propertiesSchema);