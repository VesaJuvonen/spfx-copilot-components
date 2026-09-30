import type { IVacationRequest } from '../models/zavaOne';

export const initialVacationRequests: readonly IVacationRequest[] = [
  {
    id: 'vac-1042', requesterId: 'person-diego', startDate: '2026-10-12', endDate: '2026-10-16',
    workdays: 5, requestedHours: 40, submittedAt: '2026-09-24T09:15:00Z', status: 'pending',
    leaveType: 'Annual leave', balanceBefore: 18, projectedBalance: 13, coverage: 'clear',
    coverageNote: 'Joni covers the customer review; Aurora release handoff is complete.',
    requesterNote: 'Family visit after the Aurora milestone. I have transferred the Friday support review.',
    revision: 3, history: []
  },
  {
    id: 'vac-1043', requesterId: 'person-johanna', startDate: '2026-10-05', endDate: '2026-10-07',
    workdays: 3, requestedHours: 24, submittedAt: '2026-09-24T10:40:00Z', status: 'pending',
    leaveType: 'Annual leave', balanceBefore: 11, projectedBalance: 8, coverage: 'attention',
    coverageNote: 'Accessibility lab opening is covered; one design review needs a new facilitator.',
    requesterNote: 'Short autumn break. Grady can cover the lab clinic.', revision: 2, history: []
  },
  {
    id: 'vac-1044', requesterId: 'person-joni', startDate: '2026-09-30', endDate: '2026-10-02',
    workdays: 3, requestedHours: 24, submittedAt: '2026-09-23T16:05:00Z', status: 'pending',
    leaveType: 'Family leave', balanceBefore: 9, projectedBalance: 6, coverage: 'conflict',
    coverageNote: 'Overlaps Diego and the October 1 town hall support rotation.',
    requesterNote: 'Family care appointment. Dates are fixed.', revision: 4, history: []
  },
  {
    id: 'vac-1038', requesterId: 'person-pradeep', startDate: '2026-10-19', endDate: '2026-10-23',
    workdays: 5, requestedHours: 40, submittedAt: '2026-09-21T08:20:00Z', status: 'approved',
    leaveType: 'Annual leave', balanceBefore: 22, projectedBalance: 17, coverage: 'clear',
    coverageNote: 'Singapore forecast review delegated to Lee.', requesterNote: 'School holiday week.',
    revision: 5,
    history: [{ id: 'decision-1038', decision: 'approved', decidedAt: '2026-09-22T14:10:00Z', decidedBy: 'Megan Bowen', reference: 'ZAVA-LEAVE-1038' }]
  },
  {
    id: 'vac-1036', requesterId: 'person-grady', startDate: '2026-10-08', endDate: '2026-10-09',
    workdays: 2, requestedHours: 16, submittedAt: '2026-09-20T13:45:00Z', status: 'declined',
    leaveType: 'Personal day', balanceBefore: 4, projectedBalance: 2, coverage: 'conflict',
    coverageNote: 'Both accessibility lab facilitators would be unavailable.', requesterNote: 'Personal appointment.',
    revision: 3,
    history: [{ id: 'decision-1036', decision: 'declined', decidedAt: '2026-09-21T11:30:00Z', decidedBy: 'Megan Bowen', rationale: 'Please choose a day after the lab launch coverage window.', reference: 'ZAVA-LEAVE-1036' }]
  },
  {
    id: 'vac-1045', requesterId: 'person-lee', startDate: '2026-11-02', endDate: '2026-11-13',
    workdays: 10, requestedHours: 80, submittedAt: '2026-09-24T11:15:00Z', status: 'pending',
    leaveType: 'Annual leave', balanceBefore: 12, projectedBalance: 2, coverage: 'attention',
    coverageNote: 'Long request spans the Q2 design planning kickoff.', requesterNote: 'Long-planned family travel.',
    revision: 1, history: []
  }
];