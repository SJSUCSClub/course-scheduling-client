import {
  ProfessorSchedulesRouteParams,
  ProfessorSchedulesRouteResponse,
} from '@/types/api/professor/schedules';
import chooseRandom from '@/utils/choose-random';
import { FakeResponseFunctionType } from '@/utils/fake-fetch';
import getPaginatedItems from '@/utils/get-paginated-items';

type ProfessorSchedule = ProfessorSchedulesRouteResponse['items'][number];

const schedules: ProfessorSchedule[] = Array.from<undefined, ProfessorSchedule>(
  { length: 30 },
  (v, k): ProfessorSchedule => ({
    professorId: k % 2 === 0 ? 2 : 3,
    classNumber: k,
    courseNumber: '132',
    department: 'CMPE',
    section: '01',
    dates: '01/24/24-05/13/24',
    times: '9:00 AM - 10:15 AM',
    classType: 'Lab',
    courseTitle: 'Information Security',
    availableSeats: 20,
    units: '3',
    location: 'ENGR227',
    modeOfInstruction: 'In Person',
    satisfiesArea: 'GE: A',
    days: ['M', 'W'],
    grade: chooseRandom(['C-', 'A+', 'F']),
    overall: Math.max(0.5, Math.ceil(Math.random() * 50) / 10),
    courseId: 'CMPE132',
  }),
);

export const response: FakeResponseFunctionType<
  ProfessorSchedulesRouteParams
> = ({ professorId, itemsPerPage, page }): ProfessorSchedulesRouteResponse =>
  getPaginatedItems<ProfessorSchedule>({
    items: schedules.filter((schedule) => schedule.professorId === professorId),
    itemsPerPage,
    page,
  });
