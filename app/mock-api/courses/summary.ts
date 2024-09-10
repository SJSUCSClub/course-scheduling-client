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
    avgQuality: 4,
    avgEase: 1,
    avgRating: 3,
    avgGrade: 'A-',
    ratingDistribution: [11, 5, 1, 7, 23],
    qualityDistribution: [4, 3, 2, 9, 29],
    easeDistribution: [2, 15, 11, 20, 9],
    gradeDistribution: [2, 15, 11, 20, 9, 0, 0, 0, 0, 0, 0, 0, 0],
    totalReviews: 47,
    takeAgainPercent: 52,
    tags: ['Tough Grader', 'Test Heavy'],
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
