import { Schedule, User } from '@/types/database';

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
export interface ProfessorSchedulesResponse {
  schedules: ProfessorSchedulesSchedule[];
}
