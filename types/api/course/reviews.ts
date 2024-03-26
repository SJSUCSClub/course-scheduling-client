import { Course, Review, User } from '@/types/database';
import {
  GenericReviewType,
  PaginatedItems,
  SortType,
  TagType,
} from '@/types/general';

// pick professor's name from the User table
interface CourseReview
  extends GenericReviewType,
    Pick<User, 'name'>,
    Pick<Review, 'courseId'> {}

export interface CourseReviewsRouteResponse
  extends PaginatedItems<CourseReview> {
  totalReviews: number;
  filters: {
    search: string;
    sort: SortType;
    tags: { tag: TagType; count: number }[];
    professors: { name: string; count: number }[];
  };
}
export interface CourseReviewsRouteParams
  extends Pick<PaginatedItems<CourseReview>, 'itemsPerPage' | 'page'> {
  courseId: `${Course['department']}${Course['name']}`;
}
export interface CourseReviewsRouteBody {
  filters?: {
    search?: string;
    sort?: SortType;
    tags?: Review['tags'];
    professors?: User['name'][];
  };
}
