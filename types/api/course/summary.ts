import { Course, Review } from '@/types/database';
import { DistributionType, PercentageType } from '@/types/general';

export interface CourseSummaryRouteParams {
  courseId: string;
}
export interface CourseSummaryRouteResponse
  extends Pick<Review, 'quality' | 'ease' | 'overall' | 'grade' | 'tags'>,
    Pick<
      Course,
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
