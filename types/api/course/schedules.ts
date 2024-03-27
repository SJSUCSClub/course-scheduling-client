import { Course, Schedule, User } from '@/types/database';
import {
  CourseIDType,
  GenericScheduleType,
  PaginatedItems,
} from '@/types/general';

interface CourseSchedule
  extends GenericScheduleType,
    Pick<Course, 'name'>,
    Pick<Schedule, 'classType'> {
  professorId: User['id'];
  courseId: CourseIDType;
}
export interface CourseSchedulesRouteParams
  extends Pick<PaginatedItems<CourseSchedule>, 'itemsPerPage' | 'page'> {
  courseId: CourseIDType;
}
export interface CourseSchedulesRouteResponse
  extends PaginatedItems<CourseSchedule> {}
