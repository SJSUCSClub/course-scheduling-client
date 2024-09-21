import { Course } from '@/types/database';
import { PaginatedRequest, PaginatedResponse } from '@/types/general';

export interface CourseSearchRouteBody extends PaginatedRequest {
  query?: string;
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

interface Department {
  department: string;
  count: number;
}
interface Units {
  units: string;
  count: number;
}
interface SatisfiesArea {
  satisfiesArea: string;
  count: number;
}
interface Filters {
  departments: Department[];
  units: Units[];
  satisfiesArea: SatisfiesArea[];
}
export interface CourseSearchRouteResponse
  extends PaginatedResponse<CourseSearchCourse> {
  filters: Filters;
}
