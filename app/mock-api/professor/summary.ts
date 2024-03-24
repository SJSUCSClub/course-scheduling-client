import {
  ProfessorSummaryRouteParams,
  ProfessorSummaryRouteResponse,
} from '@/types/api/professor/summary';
import { FakeResponseFunctionType } from '@/utils/fake-fetch';

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
    tags: ['Easy grader', 'Funny', 'Lots of assignments', 'Tough grader'],
  },
  {
    id: 3,
    name: 'Kurt Mammen',
    email: 'test@example.com',
    quality: 1.6,
    ease: 5,
    overall: 5,
    grade: 'B-',
    overallDistribution: [11, 5, 1, 7, 23],
    qualityDistribution: [4, 3, 2, 9, 29],
    easeDistribution: [2, 15, 11, 20, 9],
    gradeDistribution: [2, 15, 11, 20, 9],
    totalReviews: 60,
    takeAgain: 90,
    tags: ['Easy grader', 'Lots of assignments', 'Tough grader'],
  },
];

export const response: FakeResponseFunctionType<
  ProfessorSummaryRouteParams
> = ({ id }): ProfessorSummaryRouteResponse | null => {
  const professor = professors.find((professor) => professor.id === id);
  if (!professor) {
    return null;
  }
  return professor;
};
