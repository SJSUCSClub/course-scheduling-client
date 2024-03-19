import {
  GenericReviewType,
  PaginatedItems,
  SortType,
  TagType,
} from '@/types/general';
import { Course, Review, User } from '@/types/database';

interface ProfessorReview
  extends GenericReviewType,
    Pick<
      Review,
      'id' | 'courseNumber' | 'department' | 'courseId' | 'professorId'
    > {}
export interface ProfessorReviewsRouteResponse
  extends PaginatedItems<ProfessorReview> {
  totalReviews: number;
  filters: {
    sort: SortType;
    tags: { tag: TagType; count: number }[];
    courses: { course: string; count: number }[];
  };
}
export interface ProfessorReviewsRouteParams
  extends Pick<PaginatedItems<ProfessorReview>, 'itemsPerPage' | 'page'>,
    Pick<User, 'id'> {
  filters?: {
    sort?: SortType;
    tags?: Review['tags'];
    courses?: Course['courseNumber' | 'department'][];
  };
}
