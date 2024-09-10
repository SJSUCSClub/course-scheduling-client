import { User } from '@/types/database';
import { PaginatedRequest, PaginatedResponse } from '@/types/general';

export interface ProfessorSearchRouteBody extends PaginatedRequest {
  search?: string;
}
export interface ProfessorSearchRouteParams {}
interface ProfessorSearchProfessor
  extends Pick<User, 'id' | 'name' | 'email'> {}
export interface ProfessorSearchRouteResponse
  extends PaginatedResponse<ProfessorSearchProfessor> {}
