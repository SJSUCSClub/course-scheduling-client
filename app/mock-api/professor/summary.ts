import { GradeType, PercentageType, RatingType } from '@/utils/types';

const professors: ProfessorSummaryRouteResponse[] = [
  {
    id: '1',
    rating: 2.6,
    name: 'Jahan Ghofraniha',
    reviewCount: 47,
    email: 'test@example.com',
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
  },
  {
    id: '2',
    rating: 4.5,
    name: 'Loc Lam',
    reviewCount: 50,
    email: 'test@example.com',
    grade: 'B+',
    wouldTakeAgain: 80,
    ratingDistribution: [1, 0, 0, 2, 47],
    gradeDistribution: [0, 0, 1, 7, 42],
    tags: [
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
  {
    id: '3',
    rating: 1,
    name: 'Kurt Mammen',
    reviewCount: 40,
    email: 'test@example.com',
    grade: 'C',
    wouldTakeAgain: 30,
    ratingDistribution: [5, 3, 1, 10, 21],
    gradeDistribution: [5, 3, 1, 10, 21],
    tags: [
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

export interface ProfessorSummaryRouteResponse {
  id: string;
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

export interface ProfessorSummaryRouteParams {
  id: string;
}

export const response = ({
  id,
}: ProfessorSummaryRouteParams): ProfessorSummaryRouteResponse => {
  const professor = professors.find((professor) => professor.id === id);
  if (!professor) {
    throw new Error('Professor not found');
  }
  return professor;
};
