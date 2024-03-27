import { Course, Review, User } from '@/types/database';
import {
  GenericReviewType,
  PaginatedItems,
  SortType,
  TagType,
} from '@/types/general';

interface CourseReview extends GenericReviewType, Pick<Review, 'courseId'> {
  professorId: User['id'];
  professorName: User['name'];
}

export interface CourseReviewsRouteResponse
  extends PaginatedItems<CourseReview> {
  totalReviews: number;
  filters: {
    search: string;
    sort: SortType;
    tags: { tag: TagType; count: number }[];
    professors: { name: string; count: number; id: number }[];
  };
}
export interface CourseReviewsRouteParams
  extends Pick<PaginatedItems<CourseReview>, 'itemsPerPage' | 'page'> {
  courseId: `${Course['department']}${Course['courseNumber']}`;
}
export interface CourseReviewsRouteBody {
  filters?: {
    search?: string;
    sort?: SortType;
    tags?: Review['tags'];
    professors?: User['name'][];
  };
}
