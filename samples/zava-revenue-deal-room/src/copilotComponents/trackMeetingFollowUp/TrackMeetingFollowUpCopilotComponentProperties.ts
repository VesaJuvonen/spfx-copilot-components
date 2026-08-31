import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';

const schema = z.object({
  opportunityId: z.string().optional().describe('opportunityId extracted from the user request when provided.'),
  meetingId: z.string().optional().describe('meetingId extracted from the user request when provided.'),
  focus: z.string().optional().describe('focus extracted from the user request when provided.'),
  selectedId: z.string().optional().describe('selectedId extracted from the user request when provided.')
});
export type ITrackMeetingFollowUpCopilotComponentProperties = z.infer<typeof schema>;
export default zodToJsonSchema(schema);
