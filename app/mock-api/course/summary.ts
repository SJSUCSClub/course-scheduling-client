import {
  CourseSummaryRouteParams,
  CourseSummaryRouteResponse,
} from '@/types/api/course/summary';

const courses: CourseSummaryRouteResponse[] = [
  {
    id: 1,
    name: 'Advanced Algorithm Design',
    description:
      'Design and analysis of data structures and algorithms. Advanced tree structures, hashing, searching and sorting. Divide-and-conquer, greedy and dynamic programming algorithm design techniques.',
    courseNumber: '130',
    department: 'CMPE',
    prereqs: 'CMPE 126',
    units: '3',
    satisfiesArea: 'Area G',
    openSections: 3,
    totalSections: 5,
    quality: 4,
    ease: 1,
    overall: 3,
    grade: 'A-',
    overallDistribution: [11, 5, 1, 7, 23],
    qualityDistribution: [4, 3, 2, 9, 29],
    easeDistribution: [2, 15, 11, 20, 9],
    gradeDistribution: [2, 15, 11, 20, 9],
    totalReviews: 47,
    takeAgain: 52,
    tags: ['Easy grader', 'Funny', 'Lots of assignments', 'Tough grader'],
  },
];

export const response = ({
  id,
}: CourseSummaryRouteParams): CourseSummaryRouteResponse | null => {
  const course = courses.find((course) => course.id === id);
  if (!course) {
    return null;
  }
  return course;
};
