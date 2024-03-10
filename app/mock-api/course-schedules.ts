import { ScheduleType } from '@/utils/types';

const chooseRandom = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

interface CourseSchedule
  extends Omit<ScheduleType, 'heading' | 'subheading' | 'days'> {
  course: string;
  section: string;
  name: string;
  days: string[];
}

export interface CourseSchedulesRouteResponse extends Array<CourseSchedule> {}
[];

export const response: CourseSchedulesRouteResponse = Array.from<
  undefined,
  CourseSchedule
>({ length: 15 }, () => ({
  course: chooseRandom(['CMPE 132', 'CMPE 180A', 'CMPE 180B']),
  section: chooseRandom(['01', '02', '03']),
  name: chooseRandom([
    'Information Security',
    'Software Engineering I',
    'Software Engineering II',
  ]),
  enrollment: chooseRandom(['10/34', '33/34', '34/34']),
  satisfies: 'GE: A',
  units: 3,
  type: 'Lab',
  startDate: 'August 19, 2002',
  endDate: 'Dec 20, 2002',
  days: chooseRandom([
    ['M', 'W'],
    ['T', 'R'],
    ['M', 'W', 'F'],
  ]),
  times: '9:00 AM - 10:15 AM',
  location: chooseRandom(['In Person - ENGR227', 'Online']),
  avgGrade: chooseRandom(['C-', 'A+', 'F']),
  avgOverallRating: Math.max(0.5, Math.ceil(Math.random() * 50) / 10),
  number: '23105',
}));
