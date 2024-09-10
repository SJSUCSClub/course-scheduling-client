import {
  CourseSchedulesRouteBody,
  CourseSchedulesRouteParams,
  CourseSchedulesRouteResponse,
} from '@/types/api/course/schedules';
import chooseRandom from '@/utils/choose-random';
import { FakeResponseFunctionType } from '@/utils/fake-fetch';
import getPaginatedItems from '@/utils/get-paginated-items';

type CourseSchedule = CourseSchedulesRouteResponse['items'][number];
const schedules: (CourseSchedule & { courseId: string })[] = Array.from(
  { length: 30 },
  (v, k): CourseSchedule & { courseId: string } => ({
    professorName: 'Jahan Ghofraniha',
    //availableSeats: chooseRandom([5, 10, 20]),
    modeOfInstruction: chooseRandom(['In Person', 'Hybrid', 'Virtual']),
    classNumber: chooseRandom([23915, 23911, 23040]),
    classType: chooseRandom(['Lab', 'Lecture']),
    location: 'ENGR 227',
    times: '9:00 AM - 10:15 AM',
    dates: '01/24/24-05/13/24',
    days: chooseRandom(['MW', 'TR', 'R']),
    section: chooseRandom(['02', '03', '01', '05', '10']),
    courseId: chooseRandom(['CMPE130', 'CMPE126']),
    department: 'CMPE',
    courseTitle: chooseRandom(['Information Security', 'Computer Networks']),
    //overall: chooseRandom([1, 2, 3, 4, 5]),
    //grade: chooseRandom(['C', 'C+', 'A', 'B', 'F']),
    professorId: '2',
    units: '3',
    term: 'Fall',
    year: 2024,
  }),
);

export const response: FakeResponseFunctionType<
  CourseSchedulesRouteParams,
  CourseSchedulesRouteBody
> = (
  { courseNumber, department },
  { limit, page },
): CourseSchedulesRouteResponse => {
  return {
    ...getPaginatedItems<CourseSchedule>({
      items: schedules.filter(
        (schedule) =>
          schedule.courseId?.toLowerCase() ===
          (department + courseNumber).toLowerCase(),
      ),
      itemsPerPage: limit,
      page: page || 0,
    }),
    page: page || 1,
    totalResults: schedules.length,
    pages: Math.ceil(schedules.length / (limit || 3)),
  };
};
