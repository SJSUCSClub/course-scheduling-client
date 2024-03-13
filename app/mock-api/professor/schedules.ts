import getPaginatedItems, { PaginatedItems } from '@/utils/get-paginated-items';
import chooseRandom from '@/utils/choose-random';
import { ScheduleType } from '@/utils/types';

interface ProfessorSchedule
  extends Omit<ScheduleType, 'heading' | 'subheading' | 'days'> {
  id: string;
  course: string;
  section: string;
  name: string;
  days: string[];
  professor: {
    id: string;
    name: string;
  };
}

const schedules: ProfessorSchedule[] = Array.from<undefined, ProfessorSchedule>(
  { length: 15 },
  (v, k) => ({
    id: Math.random().toString(36).substring(7),
    course: 'CMPE 132',
    section: '01',
    name: 'Information Security',
    enrollment: '10/34',
    satisfies: 'GE: A',
    units: 3,
    type: 'Lab',
    startDate: 'August 19, 2002',
    endDate: 'Dec 20, 2002',
    days: ['M', 'W'],
    times: '9:00 AM - 10:15 AM',
    location: 'In Person - ENGR227',
    avgGrade: chooseRandom(['C-', 'A+', 'F']),
    avgOverallRating: Math.max(0.5, Math.ceil(Math.random() * 50) / 10),
    number: `${k}`,
    professor:
      k < 5
        ? { id: '1', name: 'Jahan Ghofraniha' }
        : k < 10
        ? { id: '2', name: 'Loc Lam' }
        : { id: '3', name: 'Kurt Mammen' },
  }),
);

export interface ProfessorSchedulesRouteResponse
  extends PaginatedItems<ProfessorSchedule> {}

export interface ProfessorSchedulesRouteParams
  extends Omit<PaginatedItems<ProfessorSchedule>, 'items'> {
  id: string;
}

export const response = ({
  id,
  itemsPerPage,
  page,
}: ProfessorSchedulesRouteParams): ProfessorSchedulesRouteResponse =>
  getPaginatedItems<ProfessorSchedule>({
    items: schedules.filter((schedule) => schedule.professor.id === id),
    itemsPerPage,
    page,
  });
