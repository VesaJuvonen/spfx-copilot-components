import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

const propertiesSchema = z.object({
  view: z.enum(['upcoming', 'year']).optional().describe('Use year for all holidays in a year, including past dates; defaults to the current year when year is omitted. Use upcoming only for future holidays.'),
  startDate: z.string().optional().describe('Optional first date of the holiday range (yyyy-mm-dd).'),
  endDate: z.string().optional().describe('Optional last date of the holiday range (yyyy-mm-dd).'),
  country: z.string().optional().describe('Optional country to show.'),
  region: z.string().optional().describe('Optional state, province, or region.'),
  month: z.number().int().min(1).max(12).optional().describe('Optional month number from 1 to 12; includes the entire month.'),
  year: z.number().int().min(1000).max(9999).optional().describe('Optional four-digit year. Without a month or date range, shows the entire year. Defaults to the current year for the year view.'),
  holidayType: z.enum(['Fixed', 'Optional']).optional().describe('Filter to fixed holidays or optional holidays.')
});

export type IUpcomingHolidaysProperties = z.infer<typeof propertiesSchema>;
export default zodToJsonSchema(propertiesSchema);