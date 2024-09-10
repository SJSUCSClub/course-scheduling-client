import {
  ProfessorSummaryRouteParams,
  ProfessorSummaryRouteResponse,
} from '@/types/api/professor/summary';
import { FakeResponseFunctionType } from '@/utils/fake-fetch';

const professors: ProfessorSummaryRouteResponse[] = [
  {
    id: '2',
    name: 'Jahan Ghofraniha',
    email: 'test@example.com',
    avgQuality: 2.6,
    avgEase: 2.8,
    avgRating: 2.4,
    avgGrade: 'A-',
    ratingDistribution: [11, 5, 1, 7, 23],
    qualityDistribution: [4, 3, 2, 9, 29],
    easeDistribution: [2, 15, 11, 20, 9],
    gradeDistribution: [2, 15, 11, 20, 9, 0, 0, 0, 0, 0, 0, 0, 0],
    totalReviews: 47,
    takeAgainPercent: 52,
    tags: ['Tough Grader', 'So Many Papers'],
  },
  {
    id: '3',
    name: 'Kurt Mammen',
    email: 'test@example.com',
    avgQuality: 1.6,
    avgEase: 5,
    avgRating: 5,
    avgGrade: 'B-',
    ratingDistribution: [11, 5, 1, 7, 23],
    qualityDistribution: [4, 3, 2, 9, 29],
    easeDistribution: [2, 15, 11, 20, 9],
    gradeDistribution: [2, 15, 11, 20, 9, 0, 0, 0, 0, 0, 0, 0, 0],
    totalReviews: 60,
    takeAgainPercent: 90,
    tags: ['Tough Grader'],
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
