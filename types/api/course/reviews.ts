import { Comment, Review } from '@/types/database';
import {
  CourseIDType,
  PaginatedRequest,
  PaginatedResponse,
  TagType,
} from '@/types/general';

export interface CourseReviewsRouteParams extends CourseIDType {}
export interface CourseReviewsRouteBody extends PaginatedRequest {
  tags?: TagType[];
  comments?: boolean;
}
interface Filters {
  tags: TagType[];
}
interface Votes {
  upvotes: number;
  downvotes: number;
}
interface CourseReviewsReview
  extends Pick<
    Review,
    | 'id'
    | 'userId'
    | 'courseNumber'
    | 'department'
    | 'createdAt'
    | 'updatedAt'
    | 'professorId'
    | 'content'
    | 'quality'
    | 'ease'
    | 'grade'
    | 'tags'
    | 'takeAgain'
    | 'isUserAnonymous'
  > {
  name?: string;
  username?: string;
  professorName: string;
  professorEmail: string;
  votes: Votes;
  comments?: Comment[];
}
export interface CourseReviewsResponse
  extends PaginatedResponse<CourseReviewsReview> {
  filters: Filters;
}
