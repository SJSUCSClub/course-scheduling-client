import { Schedule, User } from '@/types/database';
import { PaginatedRequest, PaginatedResponse } from '@/types/general';

export interface ProfessorSchedulesRouteParams extends Pick<User, 'id'> {}
interface ProfessorSchedulesSchedule
  extends Pick<
    Schedule,
    | 'term'
    | 'year'
    | 'classNumber'
    | 'section'
    | 'days'
    | 'dates'
    | 'times'
    | 'classType'
    | 'units'
    | 'location'
    | 'modeOfInstruction'
    | 'courseTitle'
    | 'department'
    | 'courseNumber'
    | 'courseId'
    | 'satisfiesArea'
  > {}
export interface ProfessorSchedulesBody extends PaginatedRequest {}
export interface ProfessorSchedulesResponse extends PaginatedResponse {
  schedules: ProfessorSchedulesSchedule[];
}
