import { Course, Review, User } from '@/types/database';
import {
  DistributionType,
  PaginatedItems,
  PercentageType,
  SortType,
} from '@/types/general';

interface ProfessorSearch
  extends Pick<Review, 'overall' | 'grade' | 'tags'>,
    Pick<User, 'id' | 'name'> {
  totalReviews: number;
  coursesInSession: Course['courseNumber' | 'department'][];
}

export interface ProfessorSearchRouteResponse
  extends PaginatedItems<ProfessorSearch> {
  totalResults: number;
  filters: {
    search: string;
    sort:
      | 'highest overall'
      | 'lowest overall'
      | 'highest grade'
      | 'lowest grade'
      | 'most reviews'
      | 'least reviews';
    tags: { tag: string; count: number }[];
    coursesInSession: { courseInSession: string; count: number }[];
  };
}
export interface ProfessorSearchRouteParams
  extends Pick<PaginatedItems<ProfessorSearch>, 'itemsPerPage' | 'page'> {}
export interface ProfessorSearchRouteBody {
  filters?: {
    search?: string;
    sort?:
      | 'highest overall'
      | 'lowest overall'
      | 'highest grade'
      | 'lowest grade'
      | 'most reviews'
      | 'least reviews';
    tags?: Review['tags'];
    coursesInSession?: Course['courseNumber' | 'department'][];
  };
}
