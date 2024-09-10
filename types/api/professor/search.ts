import { User } from '@/types/database';
import { PaginatedRequest, PaginatedResponse } from '@/types/general';

export interface ProfessorSearchBody extends PaginatedRequest {
  search?: string;
}
export interface ProfessorSearchParams {}
interface ProfessorSearchProfessor
  extends Pick<User, 'id' | 'name' | 'email'> {}
export interface ProfessorSearchResponse
  extends PaginatedResponse<ProfessorSearchProfessor> {}
