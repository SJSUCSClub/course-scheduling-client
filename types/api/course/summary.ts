import { Course, Review } from '@/types/database';
import {
  AvgReviewType,
  CourseIDType,
  GradeDistributionType,
  PercentageType,
  RatingDistributionType,
} from '@/types/general';

export interface CourseSummaryRouteBody {}
export interface CourseSummaryRouteParams extends CourseIDType {}
export interface CourseSummaryRouteResponse
  extends AvgReviewType,
    Pick<
      Course,
      | 'name'
      | 'department'
      | 'courseNumber'
      | 'units'
      | 'description'
      | 'prereqs'
      | 'satisfiesArea'
    >,
    Pick<Review, 'tags'> {
  ratingDistribution: RatingDistributionType;
  qualityDistribution: RatingDistributionType;
  easeDistribution: RatingDistributionType;
  gradeDistribution: GradeDistributionType;
  totalReviews: number;
  takeAgainPercent: PercentageType;
}
