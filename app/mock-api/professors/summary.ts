import {
  ProfessorSummaryRouteParams,
  ProfessorSummaryRouteResponse,
} from '@/types/api/professor/summary';
import { FakeResponseFunctionType } from '@/utils/fake-fetch';

const professors: ProfessorSummaryRouteResponse[] = [
  {
    id: '2',
    name: 'Jahan Ghofraniha',
    email: 'test@example.com',
  },
  {
    id: '3',
    name: 'Kurt Mammen',
    email: 'test@example.com',
  },
];

export const response: FakeResponseFunctionType<
  ProfessorSummaryRouteParams
> = ({ id }): ProfessorSummaryRouteResponse | null => {
  const professor = professors.find((professor) => professor.id === id);
  if (!professor) {
    return null;
  }
  return professor;
};
