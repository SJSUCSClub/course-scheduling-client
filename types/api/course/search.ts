import { Course } from '@/types/database';
import { PaginatedRequest, PaginatedResponse } from '@/types/general';

export interface CourseSearchRouteBody extends PaginatedRequest {
  search?: string;
  department?: string;
}
export interface CourseSearchRouteParams {}

interface CourseSearchCourse
  extends Pick<
    Course,
    | 'name'
    | 'department'
    | 'courseNumber'
    | 'units'
    | 'description'
    | 'prereqs'
    | 'satisfiesArea'
  > {}
interface Filters {
  departments: string[];
}
export interface CourseSearchRouteResponse
  extends PaginatedResponse<CourseSearchCourse> {
  filters: Filters;
}
