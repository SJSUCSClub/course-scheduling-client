import { Comment, Review, User } from '@/types/database';
import { PaginatedRequest, PaginatedResponse, TagType } from '@/types/general';

export interface ProfessorReviewsRouteParams extends Pick<User, 'id'> {}
export interface ProfessorReviewsRouteBody extends PaginatedRequest {
  tags?: TagType[];
  comments?: boolean;
}

interface Tag {
  tag: TagType;
  count: number;
}
interface Filters {
  tags: Tag[];
}
interface Votes {
  upvotes: number;
  downvotes: number;
}
interface ProfessorReviewsReview
  extends Pick<
    Review,
    | 'userId'
    | 'id'
    | 'createdAt'
    | 'updatedAt'
    | 'courseNumber'
    | 'department'
    | 'professorId'
    | 'content'
    | 'quality'
    | 'ease'
    | 'grade'
    | 'tags'
    | 'takeAgain'
    | 'isUserAnonymous'
  > {
  name: User['name'];
  username: User['name'];
  votes: Votes;
  comments?: Comment[];
}
export interface ProfessorReviewsRouteResponse
  extends PaginatedResponse<ProfessorReviewsReview> {
  filters: Filters;
}
