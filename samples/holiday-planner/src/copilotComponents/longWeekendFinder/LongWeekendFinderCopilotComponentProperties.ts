import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

const propertiesSchema = z.object({
  startDate: z.string().optional().describe('Optional first date of the search range (yyyy-mm-dd).'),
  endDate: z.string().optional().describe('Optional last date of the search range (yyyy-mm-dd).'),
  country: z.string().optional().describe('Optional country to search.'),
  region: z.string().optional().describe('Optional state, province, or region to search.')
});

export type ILongWeekendFinderProperties = z.infer<typeof propertiesSchema>;
export default zodToJsonSchema(propertiesSchema);