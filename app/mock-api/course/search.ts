import {
  CourseSearchRouteBody,
  CourseSearchRouteParams,
  CourseSearchRouteResponse,
} from '@/types/api/course/search';
import { FakeResponseFunctionType } from '@/utils/fake-fetch';
import fuzzySearch from '@/utils/fuzzy-search';
import getPaginatedItems from '@/utils/get-paginated-items';

type CourseSearch = CourseSearchRouteResponse['items'][number];
type ProfType = CourseSearch['professors'][number];

const courses: CourseSearch[] = [
  {
    name: 'Data Abstraction and Algorithms',
    overall: 2.4,
    grade: 'A-',
    totalReviews: 47,
    takeAgain: 52,
    professors: [
      { id: 2, name: 'Jahan Ghofraniha' },
      { id: 5, name: 'John Doe' },
    ],
    department: 'CMPE',
    courseNumber: '130',
    totalSections: 5,
    openSections: 1,
    units: '3',
  },
  {
    name: 'Information Security',
    overall: 5.0,
    grade: 'F',
    totalReviews: 101,
    takeAgain: 101,
    professors: [
      { id: 2, name: 'Jahan Ghofraniha' },
      { id: 5, name: 'John Doe' },
      { id: 7, name: 'Kurt Mammen' },
      { id: 8, name: 'Sara Sarrafi' },
    ],
    department: 'CMPE',
    courseNumber: '132',
    totalSections: 2,
    openSections: 2,
    units: '3',
  },
  {
    name: 'Introduction to Engineering',
    overall: 3.3,
    grade: 'C-',
    totalReviews: 30,
    department: 'E',
    courseNumber: '10',
    professors: [{ id: 2, name: 'Jahan Ghofraniha' }],
    takeAgain: 70,
    totalSections: 10,
    openSections: 7,
    units: '3',
  },
  {
    name: 'Data Structures and Algorithms',
    overall: 4.7,
    grade: 'B+',
    totalReviews: 45,
    department: 'CS',
    courseNumber: '146',
    professors: [
      { id: 66, name: 'David Taylor' },
      { id: 67, name: 'Nada Attar' },
    ],
    takeAgain: 76,
    totalSections: 5,
    openSections: 4,
    units: '3',
  },
  {
    name: 'Art History Renaissance to Modern',
    overall: 2.5,
    grade: 'B+',
    totalReviews: 35,
    department: 'ARTH',
    courseNumber: '70B',
    professors: [{ id: 68, name: 'Gretchen Simms' }],
    takeAgain: 15,
    totalSections: 3,
    openSections: 2,
    units: '3',
  },
  {
    name: 'Beginning Social Dance',
    overall: 4.5,
    grade: 'A',
    totalReviews: 75,
    department: 'KIN',
    courseNumber: '46A',
    professors: [{ id: 69, name: 'Bud Ayers' }],
    takeAgain: 75,
    totalSections: 2,
    openSections: 2,
    units: '1',
  },
];

export const response: FakeResponseFunctionType<
  CourseSearchRouteParams,
  CourseSearchRouteBody
> = ({ itemsPerPage, page }, { filters }): CourseSearchRouteResponse | null => {
  const result = courses
    .filter((course) => {
      if (filters?.search) {
        const wordsArray = course.name
          .toLowerCase()
          .replace(/[^a-zA-Z0-9 ]/g, ' ')
          .trim()
          .split(/\s+/);
        const searchQuery = filters.search.toLowerCase();
        let found = fuzzySearch(searchQuery, wordsArray, 2).length !== 0;

        const depArray = course.department
          .toLowerCase()
          .replace(/[^a-zA-Z0-9 ]/g, ' ')
          .trim()
          .split(/\s+/);
        found = found || fuzzySearch(searchQuery, depArray).length !== 0;

        const numberArray = course.courseNumber
          .toLowerCase()
          .replace(/[^a-zA-Z0-9 ]/g, ' ')
          .trim()
          .split(/\s+/);
        found = found || fuzzySearch(searchQuery, numberArray).length !== 0;
        if (!found) {
          return false;
        }
      }
      if (filters?.professors?.length) {
        if (
          !filters.professors.some((prof) =>
            course.professors.some(
              (p) => p.id == prof.id && p.name == prof.name,
            ),
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
  const professorFilters = new Map<ProfType, number>();
  result.forEach((course) => {
    course.professors.forEach((prof) => {
      const currentCount = professorFilters.get(prof) ?? 0;
      professorFilters.set(prof, currentCount + 1);
    });
  });
  return {
    totalResults: result.length,
    filters: {
      search: filters?.search ?? '',
      sort: filters?.sort ?? 'most reviews',
      professors: Array.from(professorFilters.entries()).map(
        ([prof, count]) => ({
          id: prof.id,
          name: prof.name,
          count,
        }),
      ),
    },
    ...getPaginatedItems<CourseSearch>({
      items: result,
      itemsPerPage,
      page,
    }),
  };
};
