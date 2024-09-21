import {
  ProfessorReviewsStatsRouteParams,
  ProfessorReviewsStatsRouteResponse,
} from '@/types/api/professor/reviews-stats';
import { FakeResponseFunctionType } from '@/utils/fake-fetch';

export const response: FakeResponseFunctionType<
  ProfessorReviewsStatsRouteParams
> = ({}): ProfessorReviewsStatsRouteResponse | null => {
  return {
    avgEase: 4.5,
    avgGrade: 'A',
    avgQuality: 4.5,
    avgRating: 4.5,
    totalReviews: 2,
    takeAgainPercent: 100,
    tags: [
      { tag: 'Accessible Outside Class', count: 1 },
      { tag: 'Amazing Lectures', count: 1 },
    ],
    ratingDistribution: [1, 1, 1, 1, 1],
    qualityDistribution: [1, 1, 1, 1, 1],
    easeDistribution: [1, 1, 1, 1, 1],
    gradeDistribution: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  };
};
