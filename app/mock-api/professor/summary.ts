import {
  ProfessorSummaryRouteParams,
  ProfessorSummaryRouteResponse,
} from '@/utils/types';

const professors: ProfessorSummaryRouteResponse[] = [
  {
    id: 2,
    name: 'Jahan Ghofraniha',
    email: 'test@example.com',
    quality: 2.6,
    ease: 2.8,
    overall: 2.4,
    grade: 'A-',
    overallDistribution: [11, 5, 1, 7, 23],
    qualityDistribution: [4, 3, 2, 9, 29],
    easeDistribution: [2, 15, 11, 20, 9],
    gradeDistribution: [2, 15, 11, 20, 9],
    totalReviews: 47,
    takeAgain: 52,
    tags: [
      'Hilarious',
      'Respected',
      'Caring',
      'Amazing lectures',
      'Inspirational',
      'Accessible outside class',
      'Participation matters',
      'Graded by few things',
      'Clear grading criteria',
      'Get ready to read',
      'Lots of homework',
      'Tough grader',
    ],
  },
];

export const response = ({
  id,
}: ProfessorSummaryRouteParams): ProfessorSummaryRouteResponse | null => {
  const professor = professors.find((professor) => professor.id === id);
  if (!professor) {
    return null;
  }
  return professor;
};
