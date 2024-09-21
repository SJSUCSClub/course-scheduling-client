import {
  CourseReviewsStatsRouteParams,
  CourseReviewsStatsRouteResponse,
} from '@/types/api/course/reviews-stats';

export const response = ({
  courseNumber,
  department,
}: CourseReviewsStatsRouteParams): CourseReviewsStatsRouteResponse | null => {
  return {
    department: department.toUpperCase(),
    courseNumber,
    avgEase: 4.5,
    avgQuality: 4.5,
    avgGrade: 'A',
    avgRating: 4.5,
    totalReviews: 2,
    takeAgainPercent: 100,
    gradeDistribution: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ratingDistribution: [1, 1, 1, 1, 1],
    qualityDistribution: [1, 1, 1, 1, 1],
    easeDistribution: [1, 1, 1, 1, 1],
  };
};
