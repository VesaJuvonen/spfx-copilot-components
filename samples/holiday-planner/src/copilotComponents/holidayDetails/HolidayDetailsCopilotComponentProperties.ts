import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

const propertiesSchema = z.object({
  date: z.string().optional().describe('Optional date to check in ISO format (yyyy-mm-dd).'),
  holidayName: z.string().optional().describe('Optional holiday name to look up.'),
  country: z.string().optional().describe('Optional country for the lookup.'),
  region: z.string().optional().describe('Optional state, province, or region.')
});

export type IHolidayDetailsProperties = z.infer<typeof propertiesSchema>;
export default zodToJsonSchema(propertiesSchema);