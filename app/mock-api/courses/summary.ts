import {
  CourseSummaryRouteParams,
  CourseSummaryRouteResponse,
} from '@/types/api/course/summary';

const courses: CourseSummaryRouteResponse[] = [
  {
    name: 'Advanced Algorithm Design',
    description:
      'Design and analysis of data structures and algorithms. Advanced tree structures, hashing, searching and sorting. Divide-and-conquer, greedy and dynamic programming algorithm design techniques.',
    courseNumber: '130',
    department: 'CMPE',
    prereqs: 'CMPE 126',
    units: '3',
    satisfiesArea: 'Area G',
    //openSections: 3,
    //totalSections: 5,
  },
];

export const response = ({
  courseNumber,
  department,
}: CourseSummaryRouteParams): CourseSummaryRouteResponse | null => {
  const course = courses.find(
    (course) =>
      (course.department + course.courseNumber).toLowerCase() ===
      (department + courseNumber).toLowerCase(),
  );
  if (!course) {
    return null;
  }
  return course;
};
