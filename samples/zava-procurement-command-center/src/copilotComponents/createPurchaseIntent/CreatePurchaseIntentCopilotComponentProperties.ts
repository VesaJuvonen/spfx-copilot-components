import { z } from 'zod';
import zodToJsonSchema from 'zod-to-json-schema';
const propertiesSchema=z.object({
  outcome:z.string().max(500).optional(),requestId:z.string().max(80).optional(),category:z.string().max(100).optional(),categoryHint:z.string().max(100).optional(),quantity:z.number().nonnegative().optional(),neededBy:z.string().max(40).optional(),locations:z.array(z.string().max(100)).max(20).optional(),budget:z.number().nonnegative().optional(),currency:z.string().max(8).optional(),constraints:z.array(z.string().max(300)).max(20).optional(),cohortId:z.string().max(80).optional(),eventId:z.string().max(80).optional(),supplierId:z.string().max(80).optional(),contractId:z.string().max(80).optional(),invoiceId:z.string().max(80).optional(),opportunityId:z.string().max(80).optional(),period:z.string().max(80).optional(),region:z.string().max(80).optional(),scenario:z.string().max(120).optional(),selectedId:z.string().max(80).optional(),proposedDecision:z.string().max(120).optional(),conditionText:z.string().max(1000).optional(),query:z.string().max(300).optional()
});
export type ICreatePurchaseIntentCopilotComponentProperties=z.infer<typeof propertiesSchema>;
export default zodToJsonSchema(propertiesSchema);
