import { User } from '@/types/database';
import {
  AvgReviewType,
  GradeDistributionType,
  PercentageType,
  RatingDistributionType,
  TagType,
} from '@/types/general';

export interface ProfessorSummaryRouteResponse
  extends Pick<User, 'id' | 'name' | 'email'>,
    AvgReviewType {
  tags: TagType[];
  ratingDistribution: RatingDistributionType;
  qualityDistribution: RatingDistributionType;
  easeDistribution: RatingDistributionType;
  gradeDistribution: GradeDistributionType;
  totalReviews: number;
  takeAgainPercent: PercentageType;
}
export interface ProfessorSummaryRouteParams extends Pick<User, 'id'> {}
export interface ProfessorSummaryRouteBody {}
