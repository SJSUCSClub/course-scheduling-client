import { Course, Review } from '@/types/database';
import { DistributionType, PercentageType } from '@/types/general';

export interface CourseSummaryRouteParams extends Pick<Course, 'id'> {}
export interface CourseSummaryRouteResponse
  extends Pick<Review, 'quality' | 'ease' | 'overall' | 'grade' | 'tags'>,
    Pick<
      Course,
      | 'id'
      | 'name'
      | 'description'
      | 'courseNumber'
      | 'department'
      | 'prereqs'
      | 'units'
      | 'satisfiesArea'
    > {
  overallDistribution: DistributionType;
  qualityDistribution: DistributionType;
  easeDistribution: DistributionType;
  gradeDistribution: DistributionType;
  totalReviews: number;
  takeAgain: PercentageType;
  openSections: number;
  totalSections: number;
}
