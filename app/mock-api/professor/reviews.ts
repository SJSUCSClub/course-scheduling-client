import {
  ProfessorReviewsRouteParams,
  ProfessorReviewsRouteResponse,
  ProfessorReviewsRouteBody,
} from '@/types/api/professor/reviews';
import { TagType } from '@/types/general';
import { FakeResponseFunctionType } from '@/utils/fake-fetch';
import getPaginatedItems from '@/utils/get-paginated-items';

type ProfessorReview = ProfessorReviewsRouteResponse['items'][number];

function getLevenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  // Initialize the matrix
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Compute the distance
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1,
          ),
        ); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
}

function fuzzySearch(
  input: string,
  list: string[],
  threshold: number = 1,
): string[] {
  const results: string[] = [];

  list.forEach((word) => {
    const distance = getLevenshteinDistance(input, word);
    if (distance <= threshold) results.push(word);
  });

  return results;
}

const reviews: ProfessorReview[] = Array.from<undefined, ProfessorReview>(
  { length: 100 },
  (v, k): ProfessorReview => {
    const quality = (k % 5) + 1;
    const ease = (k % 10) / 2 + 1;
    return {
      id: k,
      createdAt: 'August 19, 2002',
      courseNumber: '132',
      department: 'CMPE',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'.slice(
          0,
          50 + (k % 50),
        ),
      quality,
      ease,
      overall: Math.max(0.5, Math.ceil(((quality + ease) / 2) * 10) / 10),
      grade: k % 3 === 0 ? 'A+' : k % 2 === 0 ? 'C-' : 'F',
      takeAgain: k % 2 === 0,
      tags:
        k % 5 === 0
          ? ['Easy grader', 'Funny']
          : ['Easy grader', 'Tough grader'],
      courseId: 'CMPE132',
      isUserAnonymous: k % 5 === 0,
      userId: 1,
      upvotes: k,
      userName: 'John Doe',
      professorId: k % 2 === 0 ? 2 : 3,
    };
  },
);

export const response: FakeResponseFunctionType<
  ProfessorReviewsRouteParams,
  ProfessorReviewsRouteBody
> = (
  { id, itemsPerPage, page },
  { filters },
): ProfessorReviewsRouteResponse => {
  const result = reviews
    .filter((review) => {
      if (filters?.search) {
        const wordsArray = review.content
          .toLowerCase()
          .replace(/[^a-zA-Z0-9 ]/g, ' ')
          .trim()
          .split(/\s+/);
        const searchQuery = filters.search.toLowerCase();
        if (fuzzySearch(searchQuery, wordsArray, 2).length === 0) {
          return false;
        }
      }
      if (filters?.tags?.length) {
        if (!filters.tags.every((tag) => review.tags.includes(tag))) {
          return false;
        }
      }
      if (filters?.courses?.length) {
        if (!filters.courses.includes(review.courseId)) {
          return false;
        }
      }
      if (id !== review.professorId) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (filters?.sort === 'newest') {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (filters?.sort === 'highest') {
        return b.overall - a.overall;
      } else if (filters?.sort === 'lowest') {
        return a.overall - b.overall;
      } else {
        return b.upvotes - a.upvotes;
      }
    });
  const tagFilters = new Map<TagType, number>();
  result.forEach((review) => {
    review.tags.forEach((tag) => {
      const currentCount = tagFilters.get(tag) ?? 0;
      tagFilters.set(tag, currentCount + 1);
    });
  });
  const courseFilters = new Map<string, number>();
  result.forEach((review) => {
    const currentCount = courseFilters.get(review.courseId) ?? 0;
    courseFilters.set(review.courseId, currentCount + 1);
  });
  return {
    totalReviews: result.length,
    filters: {
      search: filters?.search ?? '',
      sort: filters?.sort ?? 'relevant',
      tags: Array.from(tagFilters.entries()).map(([tag, count]) => ({
        tag,
        count,
      })),
      courses: Array.from(courseFilters.entries()).map(([course, count]) => ({
        course,
        count,
      })),
    },
    ...getPaginatedItems<ProfessorReview>({
      items: result,
      itemsPerPage,
      page,
    }),
  };
};
