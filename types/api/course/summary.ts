import { Course } from '@/types/database';
import { CourseIDType } from '@/types/general';

export interface CourseSummaryRouteBody {}
export interface CourseSummaryRouteParams extends CourseIDType {}
export interface CourseSummaryRouteResponse
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
