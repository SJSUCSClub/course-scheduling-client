import { User } from '@/types/database';

export interface ProfessorSummaryRouteResponse
  extends Pick<User, 'id' | 'name' | 'email'> {}
export interface ProfessorSummaryRouteParams extends Pick<User, 'id'> {}
export interface ProfessorSummaryRouteBody {}
