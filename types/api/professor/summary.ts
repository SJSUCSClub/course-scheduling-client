import { Review, User } from '@/types/database';
import { DistributionType, PercentageType } from '@/types/general';

export interface ProfessorSummaryRouteResponse
  extends Pick<Review, 'quality' | 'ease' | 'overall' | 'grade' | 'tags'>,
    Pick<User, 'id' | 'name' | 'email'> {
  overallDistribution: DistributionType;
  qualityDistribution: DistributionType;
  easeDistribution: DistributionType;
  gradeDistribution: DistributionType;
  totalReviews: number;
  takeAgain: PercentageType;
}
export interface ProfessorSummaryRouteParams extends Pick<User, 'id'> {}
