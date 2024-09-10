import {
  ProfessorSchedulesRouteBody,
  ProfessorSchedulesRouteParams,
  ProfessorSchedulesRouteResponse,
} from '@/types/api/professor/schedules';
import { FakeResponseFunctionType } from '@/utils/fake-fetch';
import getPaginatedItems from '@/utils/get-paginated-items';

type ProfessorSchedule = ProfessorSchedulesRouteResponse['items'][number];

const schedules: (ProfessorSchedule & { professorId: string })[] = Array.from<
  undefined,
  ProfessorSchedule & { professorId: string }
>({ length: 30 }, (v, k): ProfessorSchedule & { professorId: string } => ({
  professorId: k % 2 === 0 ? '2' : '3',
  classNumber: k,
  courseNumber: '132',
  department: 'CMPE',
  section: '01',
  dates: '01/24/24-05/13/24',
  times: '9:00 AM - 10:15 AM',
  classType: 'Lab',
  courseTitle: 'Information Security',
  //availableSeats: 20,
  units: '3',
  location: 'ENGR227',
  modeOfInstruction: 'In Person',
  satisfiesArea: 'GE: A',
  days: 'MW',
  //grade: chooseRandom(['C-', 'A+', 'F']),
  //overall: Math.max(0.5, Math.ceil(Math.random() * 50) / 10),
  courseId: 'CMPE132',
  term: 'Fall',
  year: 2024,
}));

export const response: FakeResponseFunctionType<
  ProfessorSchedulesRouteParams,
  ProfessorSchedulesRouteBody
> = ({ id }, { page, limit }): ProfessorSchedulesRouteResponse => {
  return {
    ...getPaginatedItems<ProfessorSchedule>({
      items: schedules.filter((schedule) => schedule.professorId === id),
      itemsPerPage: limit,
      page: page || 0,
    }),
    totalResults: schedules.length,
    pages: Math.ceil(schedules.length / (limit || 3)),
    page: page || 1,
  };
};
