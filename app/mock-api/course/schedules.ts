import {
  CourseSchedulesRouteParams,
  CourseSchedulesRouteResponse,
} from '@/types/api/course/schedules';
import chooseRandom from '@/utils/choose-random';
import { FakeResponseFunctionType } from '@/utils/fake-fetch';
import getPaginatedItems from '@/utils/get-paginated-items';

type CourseSchedule = CourseSchedulesRouteResponse['items'][number];
const schedules: CourseSchedule[] = Array.from(
  { length: 30 },
  (v, k): CourseSchedule => ({
    name: 'Jahan Ghofraniha',
    availableSeats: chooseRandom([5, 10, 20]),
    modeOfInstruction: chooseRandom(['In Person', 'Hybrid', 'Virtual']),
    classNumber: chooseRandom([23915, 23911, 23040]),
    classType: chooseRandom(['Lab', 'Lecture']),
    location: 'ENGR 227',
    times: '9:00 AM - 10:15 AM',
    dates: '01/24/24-05/13/24',
    days: chooseRandom([['M', 'W'], ['T', 'R'], ['R']]),
    section: chooseRandom(['02', '03', '01', '05', '10']),
    courseId: chooseRandom(['CMPE130', 'CMPE126']),
    overall: chooseRandom([1, 2, 3, 4, 5]),
    grade: chooseRandom(['C', 'C+', 'A', 'B', 'F']),
  }),
);

export const response: FakeResponseFunctionType<CourseSchedulesRouteParams> = ({
  courseId,
  itemsPerPage,
  page,
}): CourseSchedulesRouteResponse =>
  getPaginatedItems<CourseSchedule>({
    items: schedules.filter(
      (schedule) => schedule.courseId?.toLowerCase() === courseId.toLowerCase(),
    ),
    itemsPerPage,
    page,
  });
