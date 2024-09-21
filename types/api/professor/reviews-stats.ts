import {
  AvgReviewType,
  CourseIDType,
  GradeDistributionType,
  PercentageType,
  RatingDistributionType,
  TagType,
} from '@/types/general';

interface Tag {
  tag: TagType;
  count: number;
}
export interface ProfessorReviewsStatsRouteParams extends CourseIDType {}
export interface ProfessorReviewsStatsRouteBody {}
export interface ProfessorReviewsStatsRouteResponse extends AvgReviewType {
  ratingDistribution: RatingDistributionType;
  qualityDistribution: RatingDistributionType;
  easeDistribution: RatingDistributionType;
  gradeDistribution: GradeDistributionType;
  totalReviews: number;
  takeAgainPercent: PercentageType;
  tags: Tag[];
}
