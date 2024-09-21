import {
  CourseReviewsRouteBody,
  CourseReviewsRouteParams,
  CourseReviewsRouteResponse,
} from '@/types/api/course/reviews';
import { TagType } from '@/types/general';
import { FakeResponseFunctionType } from '@/utils/fake-fetch';
import getPaginatedItems from '@/utils/get-paginated-items';

type CourseReview = CourseReviewsRouteResponse['items'][number];

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

const reviews: CourseReview[] = Array.from<undefined, CourseReview>(
  { length: 100 },
  (v, k): CourseReview => {
    const quality = (k % 5) + 1;
    const ease = (k % 11) / 2;
    const professors = ['Jahan Ghofraniha', 'David Reed', 'John Sarangupta'];
    const emails = [
      'jahan.ghofraniha@sjsu.edu',
      'david.reed@sjsu.edu',
      'john.sarangupta@sjsu.edu',
    ];
    return {
      id: k,
      createdAt: 'August 19, 2002',
      professorName: professors[k % 3],
      professorEmail: emails[k % 3],
      professorId: (k % 3).toString(),
      //courseId: 'CMPE130',
      courseNumber: '130',
      department: 'CMPE',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'.slice(
          0,
          50 + (k % 50),
        ),
      quality,
      ease,
      //overall: Math.max(0.5, Math.ceil(((quality + ease) / 2) * 10) / 10),
      grade: k % 3 === 0 ? 'A+' : k % 2 === 0 ? 'C-' : 'F',
      takeAgain: k % 2 === 0,
      tags:
        k % 5 === 0 ? ['Accessible Outside Class', 'Caring'] : ['Tough Grader'],
      isUserAnonymous: k % 5 === 0,
      userId: '1',
      votes: { upvotes: k, downvotes: 0 },
      username: 'John Doe',
    };
  },
);

export const response: FakeResponseFunctionType<
  CourseReviewsRouteParams,
  CourseReviewsRouteBody
> = (
  { courseNumber, department },
  { tags, page, limit },
): CourseReviewsRouteResponse => {
  const result = reviews.filter((review) => {
    // if (filters?.search) {
    //   const wordsArray = review.content
    //     .toLowerCase()
    //     .replace(/[^a-zA-Z0-9 ]/g, ' ')
    //     .trim()
    //     .split(/\s+/);
    //   const searchQuery = filters.search.toLowerCase();
    //   if (fuzzySearch(searchQuery, wordsArray, 2).length === 0) {
    //     return false;
    //   }
    // }
    //if (filters?.tags?.length) {
    //  if (!filters.tags.every((tag) => review.tags.includes(tag))) {
    //    return false;
    //  }
    //}
    if (tags?.length) {
      if (!tags.every((tag) => review.tags.includes(tag))) {
        return false;
      }
    }
    //if (filters?.professors?.length) {
    //  if (!filters.professors.includes(review.professorName)) {
    //    return false;
    //  }
    //}
    if (
      (courseNumber + department).toLowerCase() !==
      (review.courseNumber + review.department).toLowerCase()
    ) {
      return false;
    }
    return true;
  });
  //.sort((a, b) => {
  //  if (filters?.sort === 'newest') {
  //    return (
  //      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  //    );
  //  } else if (filters?.sort === 'highest') {
  //    return b.overall - a.overall;
  //  } else if (filters?.sort === 'lowest') {
  //    return a.overall - b.overall;
  //  } else {
  //    return b.upvotes - a.upvotes;
  //  }
  //});
  const tagFilters = new Map<TagType, number>();
  result.forEach((review) => {
    review.tags.forEach((tag) => {
      const currentCount = tagFilters.get(tag) ?? 0;
      tagFilters.set(tag, currentCount + 1);
    });
  });
  //const professorFilters = new Map<number, number>();
  //result.forEach((review) => {
  //  const currentCount = professorFilters.get(review.professorId) ?? 0;
  //  professorFilters.set(review.professorId, currentCount + 1);
  //});
  //const professorNames = new Map<number, string>();
  //result.forEach((review) => {
  //  professorNames.set(review.professorId, review.professorName);
  //});
  return {
    totalResults: result.length,
    filters: {
      //search: filters?.search ?? '',
      //sort: filters?.sort ?? 'relevant',
      tags: Array.from(tagFilters.entries()).map(([tag, count]) => {
        return { tag, count };
      }),
      //professors: Array.from(professorFilters.entries()).map(([id, count]) => ({
      //  id,
      //  name: professorNames.get(id) || '',
      //  count,
      //})),
    },
    ...getPaginatedItems<CourseReview>({
      items: result,
      itemsPerPage: limit || 3,
      page: page || 0, // this function is 0-indexed
    }),
    page: page || 1, // simulate 1-indexed
    pages: Math.ceil(result.length / (limit || 3)),
  };
};
