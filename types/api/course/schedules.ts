import { Course, Schedule, User } from '@/types/database';
import { GenericScheduleType, PaginatedItems } from '@/types/general';

interface CourseSchedule
  extends GenericScheduleType,
    Pick<User, 'name'>,
    Pick<Schedule, 'classType'> {}
export interface CourseSchedulesRouteParams
  extends Pick<PaginatedItems<CourseSchedule>, 'itemsPerPage' | 'page'> {
  courseId: string;
}
export interface CourseSchedulesRouteResponse
  extends PaginatedItems<CourseSchedule> {}
