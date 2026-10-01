import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

const propertiesSchema = z.object({
  regions: z.array(z.string()).optional().describe('Optional country or region names to compare.'),
  startDate: z.string().optional().describe('Optional first date of the comparison range (yyyy-mm-dd).'),
  endDate: z.string().optional().describe('Optional last date of the comparison range (yyyy-mm-dd).')
});

export type IRegionalComparisonProperties = z.infer<typeof propertiesSchema>;
export default zodToJsonSchema(propertiesSchema);