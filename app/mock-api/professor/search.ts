import {
  ProfessorSearchRouteBody,
  ProfessorSearchRouteParams,
  ProfessorSearchRouteResponse,
} from '@/types/api/professor/search';
import { TagType } from '@/types/general';
import { FakeResponseFunctionType } from '@/utils/fake-fetch';
import fuzzySearch from '@/utils/fuzzy-search';
import getPaginatedItems from '@/utils/get-paginated-items';

type ProfessorSearch = ProfessorSearchRouteResponse['items'][number];

const professors: ProfessorSearch[] = [
  {
    id: 2,
    name: 'Jahan Ghofraniha',
    overall: 2.4,
    grade: 'A-',
    totalReviews: 47,
    coursesInSession: ['CMPE132'],
    takeAgain: 52,
  },
  {
    id: 3,
    name: 'Kurt Mammen',
    overall: 5,
    grade: 'B-',
    totalReviews: 60,
    coursesInSession: ['CMPE132'],
    takeAgain: 90,
  },
  {
    id: 4,
    name: 'Sara Sarrafi',
    overall: 3.3,
    grade: 'C-',
    totalReviews: 30,
    coursesInSession: ['CMPE132'],
    takeAgain: 70,
  },
  {
    id: 5,
    name: 'Shadi Noghabi',
    overall: 4.1,
    grade: 'A+',
    totalReviews: 40,
    coursesInSession: ['CMPE132'],
    takeAgain: 80,
  },
  {
    id: 6,
    name: 'Ying Liu',
    overall: 3.8,
    grade: 'C-',
    totalReviews: 35,
    coursesInSession: ['CMPE132'],
    takeAgain: 60,
  },
  {
    id: 7,
    name: 'Zahra Nazari',
    overall: 4.7,
    grade: 'A+',
    totalReviews: 50,
    coursesInSession: ['CMPE132'],
    takeAgain: 100,
  },
  {
    id: 8,
    name: 'Negin Ghazanfari',
    overall: 3.7,
    grade: 'B-',
    totalReviews: 45,
    coursesInSession: ['CMPE132'],
    takeAgain: 80,
  },
];

export const response: FakeResponseFunctionType<
  ProfessorSearchRouteParams,
  ProfessorSearchRouteBody
> = (
  { itemsPerPage, page },
  { filters },
): ProfessorSearchRouteResponse | null => {
  const result = professors
    .filter((professor) => {
      if (filters?.search) {
        const wordsArray = professor.name
          .toLowerCase()
          .replace(/[^a-zA-Z0-9 ]/g, ' ')
          .trim()
          .split(/\s+/);
        const searchQuery = filters.search.toLowerCase();
        if (fuzzySearch(searchQuery, wordsArray, 2).length === 0) {
          return false;
        }
      }
      if (filters?.coursesInSession?.length) {
        if (
          !filters.coursesInSession.every((courseInSession) =>
            professor.coursesInSession.includes(courseInSession),
          )
        ) {
          return false;
        }
      }
      return true;
    })
    .sort((a, b) => {
      if (filters?.sort === 'highest overall') {
        return b.overall - a.overall;
      } else if (filters?.sort === 'lowest overall') {
        return a.overall - b.overall;
      } else if (filters?.sort === 'highest grade') {
        return b.grade?.localeCompare(a.grade ?? '') ?? 0;
      } else if (filters?.sort === 'lowest grade') {
        return a.grade?.localeCompare(b.grade ?? '') ?? 0;
      } else if (filters?.sort === 'least reviews') {
        return a.totalReviews - b.totalReviews;
      } else {
        return b.totalReviews - a.totalReviews;
      }
    });
  const courseInSessionFilters = new Map<string, number>();
  result.forEach((professor) => {
    professor.coursesInSession.forEach((courseInSession) => {
      const currentCount = courseInSessionFilters.get(courseInSession) ?? 0;
      courseInSessionFilters.set(courseInSession, currentCount + 1);
    });
  });
  return {
    totalResults: result.length,
    filters: {
      search: filters?.search ?? '',
      sort: filters?.sort ?? 'most reviews',
      coursesInSession: Array.from(courseInSessionFilters.entries()).map(
        ([courseInSession, count]) => ({
          courseInSession,
          count,
        }),
      ),
    },
    ...getPaginatedItems<ProfessorSearch>({
      items: result,
      itemsPerPage,
      page,
    }),
  };
};
