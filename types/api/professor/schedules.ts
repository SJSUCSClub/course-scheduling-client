import { Schedule, User } from '@/types/database';
import {
  CourseIDType,
  GenericScheduleType,
  PaginatedItems,
} from '@/types/general';

interface ProfessorSchedule
  extends GenericScheduleType,
    Pick<
      Schedule,
      | 'courseNumber'
      | 'department'
      | 'classType'
      | 'courseTitle'
      | 'units'
      | 'satisfiesArea'
    > {
  professorId: User['id'];
  courseId: CourseIDType;
}
export interface ProfessorSchedulesRouteResponse
  extends PaginatedItems<ProfessorSchedule> {}
export interface ProfessorSchedulesRouteParams
  extends Pick<PaginatedItems<ProfessorSchedule>, 'itemsPerPage' | 'page'>,
    Pick<ProfessorSchedule, 'professorId'> {}
