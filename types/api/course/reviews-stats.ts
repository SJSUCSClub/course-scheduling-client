import { Course } from '@/types/database';
import {
  AvgReviewType,
  CourseIDType,
  GradeDistributionType,
  PercentageType,
  RatingDistributionType,
} from '@/types/general';

export interface CourseReviewsStatsRouteParams extends CourseIDType {}
export interface CourseReviewsStatsRouteBody {}
export interface CourseReviewsStatsRouteResponse
  extends AvgReviewType,
    Pick<Course, 'courseNumber' | 'department'> {
  ratingDistribution: RatingDistributionType;
  qualityDistribution: RatingDistributionType;
  easeDistribution: RatingDistributionType;
  gradeDistribution: GradeDistributionType;
  totalReviews: number;
  takeAgainPercent: PercentageType;
}
