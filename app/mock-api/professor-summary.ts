import { GradeType, PercentageType, RatingType } from '@/utils/types';

export interface ProfessorSummaryRouteResponse {
  rating: RatingType;
  name: string;
  reviewCount: number;
  email: string;
  grade: GradeType;
  wouldTakeAgain: PercentageType;
  ratingDistribution: number[];
  gradeDistribution: number[];
  tags: string[];
}

export const response: ProfessorSummaryRouteResponse = {
  rating: 2.6,
  name: 'Jahan Ghofraniha',
  reviewCount: 47,
  email: 'YqVp3@example.com',
  grade: 'A-',
  wouldTakeAgain: 52,
  ratingDistribution: [11, 5, 1, 7, 23],
  gradeDistribution: [2, 15, 11, 20, 9],
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
};
