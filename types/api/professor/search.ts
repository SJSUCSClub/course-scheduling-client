import { Course, Review, User } from '@/types/database';
import {
  DistributionType,
  PaginatedItems,
  PercentageType,
  SearchResultSortType,
  SortType,
} from '@/types/general';

interface ProfessorSearch
  extends Pick<Review, 'overall' | 'grade'>,
    Pick<User, 'id' | 'name'> {
  totalReviews: number;
  takeAgain?: PercentageType;
  coursesInSession: Course['courseNumber' | 'department'][];
}

export interface ProfessorSearchRouteResponse
  extends PaginatedItems<ProfessorSearch> {
  totalResults: number;
  filters: {
    search: string;
    sort: SearchResultSortType;
    coursesInSession: { courseInSession: string; count: number }[];
  };
}
export interface ProfessorSearchRouteParams
  extends Pick<PaginatedItems<ProfessorSearch>, 'itemsPerPage' | 'page'> {}
export interface ProfessorSearchRouteBody {
  filters?: {
    search?: string;
    sort?: SearchResultSortType;
    coursesInSession?: Course['courseNumber' | 'department'][];
  };
}
