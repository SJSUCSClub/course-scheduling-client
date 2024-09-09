import { Schedule, User } from '@/types/database';
import { CourseIDType } from '@/types/general';

interface CourseSchedule
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
    | 'courseTitle'
    | 'units'
    | 'location'
    | 'modeOfInstruction'
    | 'professorId'
    | 'department'
  > {
  professorName: User['name'];
}
export interface CourseSchedulesRouteParams extends CourseIDType {}
export interface CourseSchedulesRouteResponse {
  schedules: CourseSchedule[];
}
