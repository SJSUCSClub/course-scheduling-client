import { Schedule } from '@/types/database';
import { GenericScheduleType, PaginatedItems } from '@/types/general';

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
      | 'courseId'
      | 'professorId'
    > {}
export interface ProfessorSchedulesRouteResponse
  extends PaginatedItems<ProfessorSchedule> {}
export interface ProfessorSchedulesRouteParams
  extends Pick<PaginatedItems<ProfessorSchedule>, 'itemsPerPage' | 'page'>,
    Pick<ProfessorSchedule, 'professorId'> {}
